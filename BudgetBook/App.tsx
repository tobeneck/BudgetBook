import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { BookingElement, defaultBookingElement, getCurrentTotal, sortBookings, updateCategory } from "./code_src/BookingScreenComponents/BookingList"
import { CategoryElement, defaultCategoryElement, getActiveCategorys, getCategorysWithoud, getTimesUsed, valueCopyCategorys } from './code_src/CategoryScreenComponents/CategoryList'
import BookingListScreen from "./code_src/BookingScreenComponents/BookingListScreen"
import CategoryListScreen from "./code_src/CategoryScreenComponents/CategoryListScreen"
import { saveToCache, exportToDownloads, readCacheData, readDownloadsData, initializeCategorysAndBookings } from './code_src/ExportImportData/CategorysAndBookingsManager'
import ReassureExportPopup from "./code_src/ExportImportData/ReassureExportPopup"
import FSAccessErrorPopup from "./code_src/ExportImportData/FSAccessErrorPopup"
import HomeScreen from "./code_src/HomeScreenComponents/HomeScreen"
import ImportScreen from "./code_src/ExportImportData/ImportScreen"
import ScreenComponent from './code_src/GenericComponents/ScreenComponent'
import { AddBookingScreen } from './code_src/BookingScreenComponents/AddBookingScreen'
import { EditBookingScreen } from './code_src/BookingScreenComponents/EditBookingScreen'
import ReassureDeleteBookingPopup from './code_src/BookingScreenComponents/ReassureDeleteBookingPopup'
import { useBackHandler } from '@react-native-community/hooks'
import { AddCategoryScreen } from './code_src/CategoryScreenComponents/AddCategoryScreen'
import EditCategoryScreen from './code_src/CategoryScreenComponents/EditCategoryScreen'
import ReassureDeleteCategoryPopup from './code_src/CategoryScreenComponents/ReassureDeleteCategoryPopup'
import SettingsScreen from './code_src/SettingsScreenComponents/SettingsScreen'
import { AppSettings, defaultSettingsValue, initializeSettings, writeSettings } from './code_src/ExportImportData/SettingsManager'
import ErrorPopup from './code_src/GenericComponents/ErrorPopup'

export enum eScreens{
  CATEGORY_LIST_SCREEN = 0,
  ADD_CATEGORY_SCREEN,
  EDIT_CATEGORY_SCREEN,

  BOOKING_LIST_SCREEN ,
  ADD_BOOKING_SCREEN,
  EDIT_BOOKING_SCREEN,

  HOME_SCREEN ,
  //EXPORT_DATA_SCREEN = "export",
  ANALYTICS,
  SETTINGS_SCREEN,
  IMPORT_DATA_SCREEN,
}

export const SettingsContext = React.createContext<AppSettings>(defaultSettingsValue);
export const errorPopupContext = React.createContext<string>("")

const App = () => {
  const [ categorys, setCategorys ] = useState<CategoryElement[]>([defaultCategoryElement]) //there needs to be at least one category!
  const [ currentCategoryIndex, setCurrentCategoryIndex ] = useState<number>(0) //TODO: again, is 0 the best way to initialize it?
  const [ reassureDeleteCategoryPopupVisible, setReassureDeleteCategoryPopupVisible ] = useState<boolean>(false)

  const [ bookings, setBookings ] = useState<BookingElement[]>([defaultBookingElement]) //there needs to be at least one booking!
  const [ currentBookingIndex, setCurrentBookingIndex ] = useState<number>(0) //TODO: is 0 really the best way to solve this?
  const [ reassureDeleteBookingPopupVisible, setReassureDeleteBookingPopupVisible ] = useState<boolean>(false)

  const [screenStack, setScreenStack] = useState<eScreens[]>([eScreens.HOME_SCREEN])
  const [settings, setSettings] = useState<AppSettings>(defaultSettingsValue)

  const [reassureExportPopupVisible, setReassureExportPopupVisible] = useState<boolean>(false)

  const [fsAccessErrorPopupVisible, setFsAccessErrorPopupVisible] = useState<boolean>(false)

  const [genericErrorPopupVisible, setGenericErrorPopupVisible] = useState<boolean>(false)
  const [genericErrorPopupText, setGenericErrorPopupText] = useState<string>("")


  /**
   * handles an error when the file system access is not right
   */
  const handleFsAccessError = () => {
    setFsAccessErrorPopupVisible(true)
  }

  const handleGenericError = (message: string) => {
    setGenericErrorPopupText(message)
    setGenericErrorPopupVisible(true)
    //TODO: implement the popup and stuff!
  }


  /**
   * saves the new bookings to the cache and to the state
   * @param newBookings the new bookings to be saved
   */
  const setAndSaveBookings = (newBookings: BookingElement[]): void => {
    saveToCache(categorys, newBookings, handleGenericError)
    setBookings(newBookings)
  }

  /**
   * saves the new categorys to the cache and to the state
   * @param newCategorys the new categorys to be saved
   */
  const setAndSaveCategorys = (newCategorys: CategoryElement[]): void => {
    console.log("setting new categorys: ", newCategorys)
    saveToCache(newCategorys, bookings, handleGenericError)
    setCategorys(newCategorys)
  }

  /**
   * saves the new categorys and the new bookings to the cache and to the state. Use this if you wand to save both at once to avoid writing to the cache twice!
   * @param newCategorys the new categorys to be saved
   * @param newBookings the new bookings to be saved
   */
  const setAndSaveBookingsAndCategorys = (newCategorys: CategoryElement[], newBookings: BookingElement[]): void => {
    saveToCache(newCategorys, newBookings, handleGenericError)
    setBookings(newBookings)
    setCategorys(newCategorys)
  }

  /**
   * sets the new settings and saves it into a file
   * @param newSettings the new settings
   */
  const setAndSaveSettings = (newSettings: AppSettings): void => {
    setSettings(newSettings)
    writeSettings(newSettings, handleGenericError)
  }


  /**
   * pops the last item off the screen stack if the screen stack length is longer than 1
   * @param count the amount of screens that should be popped
   */
  const popScreenStack = (count: number = 1): void => {
    if(screenStack.length > 1)
      setScreenStack(screenStack.slice(0,screenStack.length-count))
  }

  /**
   * pushes a new screen onto the screen stack
   * @param newScreen tne new screen to be added
   */
  const pushScreenStack = (newScreen: eScreens): void => {
    setScreenStack([...screenStack, newScreen])
  }

  /**
   * pushes the new screen onto the screen stack
   */
  const renderScreen = (screenToRender: eScreens): JSX.Element => {
    switch(screenToRender){
      case eScreens.CATEGORY_LIST_SCREEN:
        return (
          <ScreenComponent
            onHeaderBackButtonPressed={() => popScreenStack()}
            headerHeadline={"Categorys"}
            content = {
              <CategoryListScreen
                categorys={categorys}
                onEditCategory={(index: number) => {
                  setCurrentCategoryIndex(categorys.length - 1 - index) //TODO: this is ugly!
                  pushScreenStack(eScreens.EDIT_CATEGORY_SCREEN)
                }}
                onAddCategory={() => {
                  pushScreenStack(eScreens.ADD_CATEGORY_SCREEN)
                }}
              />
            }
          />
        )
      case eScreens.ADD_CATEGORY_SCREEN:
          return (
            <ScreenComponent
              onHeaderBackButtonPressed={() => popScreenStack()}
              headerHeadline={"Add Category"}
              content = {
                <AddCategoryScreen
                  onAddPressed={(categoryName: string, categoryDescription: string, categoryColor: string, active: boolean, hasMaxBudget: boolean, maxBudget: number) => {
                    setAndSaveCategorys([{id: categorys.length, name: categoryName, description: categoryDescription, color: categoryColor, activated: active, hasBudget: hasMaxBudget, maxBudget: maxBudget} as CategoryElement, ...categorys])
                    popScreenStack()
                  }}
                  onCancelPressed={ () => {
                    popScreenStack()
                  }}
                />
              }
            />
            )

        case eScreens.EDIT_CATEGORY_SCREEN:
          return (
            <ScreenComponent
              onHeaderBackButtonPressed={() => popScreenStack()}
              headerHeadline={"Edit Category"}
              content = {
                <EditCategoryScreen
                  category={categorys[currentCategoryIndex]}

                  onCancelPressed={() => {
                    setCurrentCategoryIndex(0)
                    popScreenStack()
                  }}
                  onSavePressed={(nce: CategoryElement) => {
                    const newCategoryList: CategoryElement[] = valueCopyCategorys(categorys)
                    newCategoryList[currentCategoryIndex] = nce

                    const oldCategory: CategoryElement = categorys[currentCategoryIndex]
                    const newBookingList: BookingElement[] = updateCategory(bookings, oldCategory, nce)

                    setAndSaveBookingsAndCategorys(newCategoryList, newBookingList)

                    popScreenStack()
                  }}
                  onDeletePressed={() => {
                    setReassureDeleteCategoryPopupVisible(true)
                  }}
                />
              }
            />
            )
      case eScreens.BOOKING_LIST_SCREEN:
        return (
          <ScreenComponent
          onHeaderBackButtonPressed={() => popScreenStack()}
          headerHeadline={"Bookings"}
          content = {
              <BookingListScreen
                bookings={bookings}
                setBookings={setAndSaveBookings}
                onOpenAddBooking={() => pushScreenStack(eScreens.ADD_BOOKING_SCREEN)}
                onOpenEditBooking={(index: number) => {
                  setCurrentBookingIndex(index)
                  pushScreenStack(eScreens.EDIT_BOOKING_SCREEN)
                }}
              />
          }
        />
         )
      case eScreens.ADD_BOOKING_SCREEN:
        return (
          <ScreenComponent
          onHeaderBackButtonPressed={() => popScreenStack()}
          headerHeadline={"Add Booking"}
          content = {
            <AddBookingScreen
                categorys={getActiveCategorys(categorys)}
                //addItem={addBooking}
                onAddPressed={(nbe: BookingElement) => {
                  setAndSaveBookings(sortBookings([nbe, ...bookings]))
                  popScreenStack()
                }}
                onCancelPressed={() => popScreenStack()}
                currentTotal={getCurrentTotal(bookings)}
                minimumPossibleDate={bookings[bookings.length - 1].date} //TODO: ugly indexing. The initial item is ment
                onOpenAddCategorys={() => pushScreenStack(eScreens.ADD_CATEGORY_SCREEN)}
            />
          }
        />
          )

      case eScreens.EDIT_BOOKING_SCREEN:
        return (
          <ScreenComponent
          onHeaderBackButtonPressed={() => popScreenStack()}
          headerHeadline={"Edit Booking"}
          content = {
            <EditBookingScreen
                onCancelPressed={() => {
                  setCurrentBookingIndex(0)
                  popScreenStack()
                }}
                onSavePressed={(nbe: BookingElement) => {
                  const newBookingList: BookingElement[] = bookings
                  newBookingList[currentBookingIndex] = nbe
                  setAndSaveBookings(sortBookings(newBookingList))
                  setCurrentBookingIndex(0)
                  popScreenStack()
                }}
                onDeletePressed={() => {
                  setReassureDeleteBookingPopupVisible(true)
                }}
                minimumPossibleDate={bookings.length - 1 - currentBookingIndex !== 0 ? bookings[bookings.length - 1].date : undefined} //TODO: ugly indexing
                maximumPossibleDate={bookings.length - 1 - currentBookingIndex === 0 && bookings.length > 1 ? bookings[bookings.length - 2].date : undefined} //TODO: ugly indexing
                categorys={getActiveCategorys(categorys, bookings[currentBookingIndex].category)}
                booking={bookings[currentBookingIndex]}
                currentIndex={bookings.length - 1 - currentBookingIndex}
                onOpenAddCategorys={() => pushScreenStack(eScreens.ADD_CATEGORY_SCREEN)}
            />
          }
        />
          )
      case eScreens.HOME_SCREEN:
        return (
          <ScreenComponent
          //onHeaderBackButtonPressed={() => setCurrentScreen(eScreens.SCREEN_SWITCHER_SCREEN)}
          headerHeadline={"Budget Book"}
          content = {
            <HomeScreen
              openScreen={(newScreen: eScreens) => {
                pushScreenStack(newScreen)
              }}
            />
          }
        />
        )
       case eScreens.SETTINGS_SCREEN:
        return (
          <ScreenComponent
            onHeaderBackButtonPressed={() => popScreenStack()}
            headerHeadline={"Settings"}
            content = {
              <SettingsScreen
                openScreen={(newScreen: eScreens) => {
                  pushScreenStack(newScreen)
                }}
                openExportPopup={() => {
                  setReassureExportPopupVisible(true)
                }}
                setNewSettings={(newSettings: AppSettings) => setAndSaveSettings(newSettings)}
              />
            }
          />
        )
      case eScreens.IMPORT_DATA_SCREEN:
        return(
          <ScreenComponent
            onHeaderBackButtonPressed={() => popScreenStack()}
            headerHeadline={"Import"}
            content = {
              <ImportScreen
              importData={(fileName: string) => {
                readDownloadsData(fileName, setAndSaveBookingsAndCategorys, handleFsAccessError, handleGenericError)
                //if successfull pop the screen stack and go back to settings
                popScreenStack()
              }}
              handleError={handleGenericError}
              handleAccessError={handleFsAccessError}
            />
            }
          />
        )
      default:
        return (<Text>An error occured rendering the current screen</Text>)
    }
  }

  useEffect(() => {
    //read the initial data
    initializeCategorysAndBookings((newCategorys: CategoryElement[], newBookings: BookingElement[]) => {setCategorys(newCategorys); setBookings(newBookings)}, handleGenericError)
    //readCacheData(setCategorys, setBookings, handleGenericError)

    initializeSettings((newSettings: AppSettings) => setSettings(newSettings), handleGenericError)
    //readSettings((newSettings: AppSettings) => setSettings(newSettings), handleFsAccessError, handleGenericError)
  }, []);

  useBackHandler(() => {
    if (screenStack.length > 1) {
      // handle it
      popScreenStack()
      return true
    }
    // let the default thing happen
    return false
  })

  return (
    <SafeAreaView
      style={{height: "100%", width: "100%"}}
    >
      {/* the popups: */}
      <ReassureDeleteBookingPopup
        visible={reassureDeleteBookingPopupVisible}
        booking={bookings[currentBookingIndex]}
        onCancelPressed={() => {
          setCurrentBookingIndex(0)
          setReassureDeleteBookingPopupVisible(false)
        }}
        onDeletePressed={() => {
          const newBookingList: BookingElement[] = bookings

          if (currentBookingIndex > -1) {
              newBookingList.splice(currentBookingIndex, 1);
          }

          setAndSaveBookings(newBookingList)

          setCurrentBookingIndex(0)
          popScreenStack()
          setReassureDeleteBookingPopupVisible(false)
        }}
      />

      <ReassureDeleteCategoryPopup
          visible={reassureDeleteCategoryPopupVisible}
          remainingCategorys={getCategorysWithoud(categorys, currentCategoryIndex)}
          timesUsed={getTimesUsed(categorys[currentCategoryIndex], bookings)}
          category={categorys[currentCategoryIndex]}
          onCancelPressed={() => {
            setReassureDeleteCategoryPopupVisible(false)
          }}
          onDeletePressed={(oldID: number, newID: number) => {
            //compute the "new" categorys
            const remainingCategorys: CategoryElement[] = getCategorysWithoud(categorys, currentCategoryIndex)

            //set the categorys and maybe bookings:
            const timesUsed: number = getTimesUsed(categorys[currentCategoryIndex], bookings)
            const deletedCategory: CategoryElement = categorys[currentCategoryIndex]
            if(timesUsed > 0)
                setAndSaveBookingsAndCategorys(remainingCategorys, updateCategory(bookings, deletedCategory, remainingCategorys[newID]))
            else
                setAndSaveCategorys(remainingCategorys)

            setCurrentCategoryIndex(0)
            popScreenStack()
            setReassureDeleteCategoryPopupVisible(false)
          }}
      />

      <ReassureExportPopup
      //TODO: put this into the homescreen?
        visible={reassureExportPopupVisible}
        onCancelPressed={() => setReassureExportPopupVisible(false)}
        onExportPressed={() => {
          exportToDownloads(categorys, bookings, handleFsAccessError, handleGenericError)
          setReassureExportPopupVisible(false)
        }}
        handleError={handleGenericError}
        handleAccessError={handleFsAccessError}
      />
      <FSAccessErrorPopup
        visible={fsAccessErrorPopupVisible}
        setVisible={(visible: boolean) => setFsAccessErrorPopupVisible(visible)}
        //TODO: generic error popup
      />
      <ErrorPopup
        visible={genericErrorPopupVisible}
        errorText={genericErrorPopupText}
        closePopup={() => {
          setGenericErrorPopupVisible(false)
          setGenericErrorPopupText("")
        }}
      />


      <SettingsContext.Provider value={settings}>
        {
          renderScreen(screenStack[screenStack.length-1])
        }
      </SettingsContext.Provider>
    </SafeAreaView>
  );
};

export default App;
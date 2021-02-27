import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';
import { BookingElement, defaultBookingElement } from "./code_src/BookingScreenComponents/BookingList" //debugg purpose
import { Text } from 'react-native';
import { CategoryElement, defaultCategoryElement } from './code_src/CategoryScreenComponents/CategoryList';
import BookingListScreen from "./code_src/BookingScreenComponents/BookingListScreen"
import CategoryListScreen from "./code_src/CategoryScreenComponents/CategoryListScreen"
import { saveToCache, exportToDownloads, readFile, readCacheData, readDownloadsData } from './code_src/ExportImportData/CSVHandler';
import { colors, headerStyles } from "./code_src/Styles/Styles"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReassureExportPopup from "./code_src/ExportImportData/ReassureExportPopup"
import ErrorExportingPopup from "./code_src/ExportImportData/ErrorExportingPopup"
import { request, PERMISSIONS } from "react-native-permissions"
import ScreenSwitcherScreen from "./code_src/ScreenSwitcherComponents/ScreenSwitcherScreen"
import ImportScreen from "./code_src/ExportImportData/ImportScreen"
import SuperCategoryListScreen from './code_src/SuperCategoryScreenComponents/SuperCategoryScreen';
import { SuperCategoryElement } from './code_src/SuperCategoryScreenComponents/SuperCategoryList';

export enum eCurrentScreen{
  CATEGORY_LIST_SCREEN = 0,
  BOOKING_LIST_SCREEN,
  SCREEN_SWITCHER_SCREEN,
  EXPORT_DATA_SCREEN,
  IMPORT_DATA_SCREEN,
  GRAPHS_SCREEN,
  INFO_SCREEN,
  SUPER_CATEGORY_LIST_SCREEN,
}

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<eCurrentScreen>(eCurrentScreen.BOOKING_LIST_SCREEN)
  const [categorys, setCategorys] = useState<CategoryElement[]>([defaultCategoryElement]) //there needs to be at least one category!
  const [bookings, setBookings] = useState<BookingElement[]>([defaultBookingElement]) //there needs to be at least one booking!
  const [superCategorys, setSuperCategorys] = useState<SuperCategoryElement[]>([])

  const [reassureExportPopupVisible, setReassureExportPopupVisible] = useState<boolean>(false)
  const [errorExportingPopupVisible, setErrorExportingPopupVisible] = useState<boolean>(false)

  useEffect(() => {
    readCacheData(setCategorys, setBookings)

    // return(
    //   saveToCache(categorys, bookings) //save the data when closing the app
    // )
  }, [])

  /**
   * If a unexpected error occured, this callback can be called to open the generigErrorPopup
   * @param e the error which occured
   */
  const genericErrorCallback = (e: Error) => {
    //TODO: open a generic error popup
  }

  /**
   * callback when an error occurs during exporting.
   */
  const errorExportingCallback = (e: Error) => {
    //TODO: check if its really a permission error
    // if(e.message.includes("Permission denied")){

    // }

    request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
      switch(result){
        case "denied":
          setErrorExportingPopupVisible(true)
          break;
        case "blocked":
          setErrorExportingPopupVisible(true)
          break;
        case "granted":
          exportToDownloads(categorys, bookings, genericErrorCallback)
          break;
        // case "limited":
        //   break;
        // case "unavailable":
        //   break;
        default:
          genericErrorCallback(e)
      }
      console.log(result)
    });
    //setErrorExportingPopupVisible(true)
  }

  /**
   * returns the right title for the right screen
   */
  const getHeaderTitle = (): string => {
    switch(currentScreen){
      case eCurrentScreen.BOOKING_LIST_SCREEN:
        return "Booking List"
      case eCurrentScreen.CATEGORY_LIST_SCREEN:
        return "Category List"
      case eCurrentScreen.SUPER_CATEGORY_LIST_SCREEN:
        return "Super Category List"
      case eCurrentScreen.INFO_SCREEN:
        return "App Info"
      case eCurrentScreen.SCREEN_SWITCHER_SCREEN:
          return "Budget Book"
      case eCurrentScreen.IMPORT_DATA_SCREEN:
          return "Import Data"
      default:
        return "Error: Title not found"
    }
  }

  /**
   * saves the new bookings to the cache and to the state
   * @param newBookings the new bookings to be saved
   */
  const setAndSaveBookings = (newBookings: BookingElement[]): void => {
    saveToCache(categorys, newBookings)
    setBookings(newBookings)
  }

  /**
   * saves the new categorys to the cache and to the state
   * @param newCategorys the new categorys to be saved
   */
  const setAndSaveCategorys = (newCategorys: CategoryElement[]): void => {
    saveToCache(newCategorys, bookings)
    setCategorys(newCategorys)
  }

  /**
   * saves the new categorys and the new bookings to the cache and to the state. Use this if you wand to save both at once to avoid writing to the cache twice!
   * @param newCategorys the new categorys to be saved
   * @param newBookings the new bookings to be saved
   */
  const setAndSaveBookinbsAndCategorys = (newCategorys: CategoryElement[], newBookings: BookingElement[]): void => {
    saveToCache(newCategorys, newBookings)
    setBookings(newBookings)
    setCategorys(newCategorys)
  }

  /**
   * renders the status bar, header and contains its functionality
   */
  const renderHeader = (): JSX.Element => {
    return (
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        backgroundColor={colors.darkBlue}
        containerStyle={headerStyles.headerContainer}
        style={headerStyles.headerStyle}
      >
        { currentScreen !== eCurrentScreen.SCREEN_SWITCHER_SCREEN &&
          <Icon
          name='arrow-left'
          size={30}
          color="white"
          onPress={() => setCurrentScreen(eCurrentScreen.SCREEN_SWITCHER_SCREEN)}
        />
        }
        <Text style={ {color: 'white', fontWeight: 'bold', fontSize: 18, justifyContent: "center"} }>{getHeaderTitle()}</Text>
      </Header>
    )

  }

  /**
   * returns the current screen to render
   */
  const renderCurrentScreen = (): JSX.Element => {
    switch(currentScreen){
      case eCurrentScreen.CATEGORY_LIST_SCREEN:
        return (
        <CategoryListScreen
          categorys={categorys}
          setCategorys={setAndSaveCategorys}
          bookings={bookings}
          setCategorysAndBookings={setAndSaveBookinbsAndCategorys}
        />)
      case eCurrentScreen.SUPER_CATEGORY_LIST_SCREEN:
        return (
          <SuperCategoryListScreen
            superCategorys={superCategorys}
            setSuperCategorys={setSuperCategorys}
            categorys={categorys}
          />
        )
      case eCurrentScreen.BOOKING_LIST_SCREEN:
        return (
        <BookingListScreen
          categorys={categorys}
          bookings={bookings}
          setBookings={setAndSaveBookings}
        />)
      case eCurrentScreen.SCREEN_SWITCHER_SCREEN:
        return(
          <ScreenSwitcherScreen
            openScreen={(newScreen: eCurrentScreen) => setCurrentScreen(newScreen)}
            openExportPopup={() => setReassureExportPopupVisible(true)}
          />
        )
      case eCurrentScreen.IMPORT_DATA_SCREEN:
        return(
          <ImportScreen
            loadCsvFile={(fileName: string) => readDownloadsData(fileName, setCategorys, setBookings)}
          />
        )
      default:
        return (<Text>An error occured rendering the current screen</Text>)
    }
  }


  return (
    <SafeAreaView
      style={{height: "100%", width: "100%"}}
    >
      <ReassureExportPopup
        visible={reassureExportPopupVisible}
        onCancelPressed={() => setReassureExportPopupVisible(false)}
        onExportPressed={() => {
          exportToDownloads(categorys, bookings, errorExportingCallback)
          setReassureExportPopupVisible(false)
        }}
      />
      <ErrorExportingPopup
        visible={errorExportingPopupVisible}
        onCancelPressed={(() => setErrorExportingPopupVisible(false))}
      />
      { renderHeader() }
      { renderCurrentScreen() }
    </SafeAreaView>
  );
};

export default App;
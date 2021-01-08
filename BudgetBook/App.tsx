import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';
import { BookingElement, defaultBookingElement } from "./code_src/BookingScreenComponents/BookingList" //debugg purpose
import { Text } from 'react-native';
import { CategoryElement, defaultCategoryElement } from './code_src/CategoryScreenComponents/CategoryList';
import BookingListScreen from "./code_src/BookingListScreen"
import CategoryListScreen from "./code_src/CategoryListScreen"
import { saveToCache, exportToDownloads, readCache } from './code_src/ExportImportData/CSVHandler';
import { DefaultColors, headerStyles } from "./code_src/Styles/Styles"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReassureExportPopup from "./code_src/ExportImportData/ReassureExportPopup"
import ErrorExportingPopup from "./code_src/ExportImportData/ErrorExportingPopup"
import { request, PERMISSIONS } from "react-native-permissions"

enum eCurrentScreen{
  CATEGORY_LIST_SCREEN = 0,
  BOOKING_LIST_SCREEN
}

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<eCurrentScreen>(eCurrentScreen.BOOKING_LIST_SCREEN)
  const [categorys, setCategorys] = useState<CategoryElement[]>([defaultCategoryElement]) //there needs to be at least one category!
  const [bookings, setBookings] = useState<BookingElement[]>([defaultBookingElement]) //there needs to be at least one booking!

  const [reassureExportPopupVisible, setReassureExportPopupVisible] = useState<boolean>(false)
  const [errorExportingPopupVisible, setErrorExportingPopupVisible] = useState<boolean>(false)

  useEffect(() => {
    readCache(setCategorys, setBookings)

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

    /**
     * handles pressing the screenSwitch button in the header
     */
    const handleScreenSwitch = (): void => {
      switch(currentScreen){
        case eCurrentScreen.CATEGORY_LIST_SCREEN:
          setCurrentScreen(eCurrentScreen.BOOKING_LIST_SCREEN)
          break;
        case eCurrentScreen.BOOKING_LIST_SCREEN:
          setCurrentScreen(eCurrentScreen.CATEGORY_LIST_SCREEN)
          break;
      }
    }

    return (
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        backgroundColor={DefaultColors.darkBlue}
        containerStyle={headerStyles.header}
      >
        <Icon
          name='menu'
          size={25}
          color="white"
          onPress={() => handleScreenSwitch()}
        />
        <Text style={ {color: 'white', fontWeight: 'bold', fontSize: 18} }>{getHeaderTitle()}</Text>
        <Icon
          name="file-export-outline"
          size={25}
          color="#fff"
          onPress={() => setReassureExportPopupVisible(true)}
          style={{alignContent: "center"}}
        />
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
      case eCurrentScreen.BOOKING_LIST_SCREEN:
        return (
        <BookingListScreen
          categorys={categorys}
          bookings={bookings}
          setBookings={setAndSaveBookings}
        />)
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
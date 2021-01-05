import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import { BookingElement, defaultBookingElement } from "./code_src/BookingScreenComponents/BookingList" //debugg purpose
import { Text } from 'react-native';
import { CategoryElement, defaultCategoryElement } from './code_src/CategoryScreenComponents/CategoryList';
import BookingListScreen from "./code_src/BookingListScreen"
import CategoryListScreen from "./code_src/CategoryListScreen"
import { saveToCache, exportToDownloads, readCache } from './code_src/CSVHandler';

enum eCurrentScreen{
  CATEGORY_LIST_SCREEN = 0,
  BOOKING_LIST_SCREEN
}

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<eCurrentScreen>(eCurrentScreen.BOOKING_LIST_SCREEN)
  const [categorys, setCategorys] = useState<CategoryElement[]>([defaultCategoryElement]) //there needs to be at least one category!
  const [bookings, setBookings] = useState<BookingElement[]>([defaultBookingElement]) //there needs to be at least one booking!

  useEffect(() => {
    readCache(setCategorys, setBookings)

    // return(
    //   saveToCache(categorys, bookings) //save the data when closing the app
    // )
  }, [])

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
   * renders the header and contains its functionality
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
        leftComponent={{ icon:'menu', color: '#fff', onPress: () => handleScreenSwitch() }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff', onPress: () => exportToDownloads(categorys, bookings) }}
      />
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
    <>
      <StatusBar barStyle="light-content" />
      { renderHeader() }
      { renderCurrentScreen() }
    </>
  );
};

export default App;

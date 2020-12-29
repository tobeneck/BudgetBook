import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import { BookingElement } from "./code_src/BookingScreenComponents/BookingList" //debugg purpose
import { Text } from 'react-native';
import { CategoryElement, defaultCategoryElement } from './code_src/CategoryScreenComponents/CategoryList';
import BookingListScreen from "./code_src/BookingListScreen"
import CategoryListScreen from "./code_src/CategoryListScreen"

enum eCurrentScreen{
  CATEGORY_LIST_SCREEN = 0,
  BOOKING_LIST_SCREEN
}

declare const global: {HermesInternal: null | {}}

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<eCurrentScreen>(eCurrentScreen.BOOKING_LIST_SCREEN)

  const [categorys, setCategorys] = useState<CategoryElement[]>([{name: "test", id: 1}, defaultCategoryElement]) //TODO: load categorys here

  const [bookings, setBookings] = useState<BookingElement[]>([ //TODO: load items here
    {date: new Date(), amount: -15, name: "test5", category: defaultCategoryElement},
    {date: new Date(), amount: -14, name: "test4", category: defaultCategoryElement},
    {date: new Date(), amount: -13, name: "test3", category: defaultCategoryElement},
    {date: new Date(), amount: -12, name: "test2", category: defaultCategoryElement},
    {date: new Date(), amount: -11, name: "test1", category: defaultCategoryElement}
  ])

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
        rightComponent={{ text: 'home', color: '#fff' }}
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
          setCategorys={setCategorys}
          bookings={bookings}
          setBookings={setBookings}
        />)
      case eCurrentScreen.BOOKING_LIST_SCREEN:
        return (
        <BookingListScreen
          categorys={categorys}
          bookings={bookings}
          setBookings={setBookings}
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

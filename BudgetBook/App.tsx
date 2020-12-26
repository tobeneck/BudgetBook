import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Button } from 'react-native';
import { Header } from 'react-native-elements';
import CategoryList from "./code_src/CategoryScreenComponents/CategoryList"
import { BookingElement } from "./code_src/BookingScreenComponents/BookingListElement" //debugg purpose
import { Text } from 'react-native';
import { AddCategoryPopup } from "./code_src/CategoryScreenComponents/AddCategoryPopup"
import { CategoryElement, defaultCategoryElement } from './code_src/CategoryScreenComponents/CategoryListElement';
import BookingScreen from "./code_src/BookingScreen"

enum eCurrentScreen{
  CATEGORY_LIST_SCREEN = 0,
  BOOKING_LIST_SCREEN
}

declare const global: {HermesInternal: null | {}}

const App = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false) //TODO: capsulate for category and booking
  const [editBookingVisible, setEditBookingVisible] = useState<boolean>(false)

  const [currentScreen, setCurrentScreen] = useState<eCurrentScreen>(eCurrentScreen.BOOKING_LIST_SCREEN)

  const [categorys, setCategorys] = useState<CategoryElement[]>([defaultCategoryElement]) //TODO: load categorys here

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
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => handleScreenSwitch() }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
    )

  }

  /**
   * renders the category list screen and its interaction components
   */
  const renderCategoryList = (): JSX.Element => {

    /**
     * handles the Add Booking button press event
     * @param e the pressEvent returned from the test
     */
    const onAddCategoryPressed = (e: Event): void => { //TODO: inline?
      setModalVisible(true)
    }

    /**
     * handles the addition of a booking item
     * @param item the item to be added
     */
    const addBookingItem = (categoryName: string): void => {
      setCategorys([{id: categorys.length, name: categoryName, editable: true} as CategoryElement, ...categorys])
    }

    return (
      <SafeAreaView>
        <AddCategoryPopup visible={modalVisible} setModalVisible={setModalVisible} addCategory={addBookingItem} />
        <View>
          <CategoryList categorys={categorys} />
          <Button
            onPress={(e: Event) => onAddCategoryPressed(e)}
            title="Add Category"
            color="#841584"
            accessibilityLabel="Add Item to the budget list" />
        </View>
      </SafeAreaView>
    )
  }

  /**
   * returns the current screen to render
   */
  const renderCurrentScreen = (): JSX.Element => {
    switch(currentScreen){
      case eCurrentScreen.CATEGORY_LIST_SCREEN:
        return renderCategoryList()
      case eCurrentScreen.BOOKING_LIST_SCREEN:
        return (<BookingScreen categorys={categorys} bookings={bookings} setBookings={setBookings} />)
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

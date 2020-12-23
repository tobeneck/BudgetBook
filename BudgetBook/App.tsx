/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, Button } from 'react-native';
import { Header } from 'react-native-elements';
import BookingList from "./code_src/BookingList"
import CategoryList from "./code_src/CategoryList"
import { BookingElement } from "./code_src/BookingListElement" //debugg purpose
import { AddBookingPopup } from "./code_src/AddBookingPopup"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Text } from 'react-native';
import { AddCategoryPopup } from "./code_src/AddCategoryPopup"
import { CategoryElement, defaultCategoryElement } from './code_src/CategoryListElement';

enum eCurrentScreen{
  CATEGORY_LIST_SCREEN = 0,
  BOOKING_LIST_SCREEN
}

declare const global: {HermesInternal: null | {}}

const App = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false) //TODO: capsulate for category and booking

  const [currentScreen, setCurrentScreen] = useState<eCurrentScreen>(eCurrentScreen.BOOKING_LIST_SCREEN)

  const [categorys, setCategorys] = useState<CategoryElement[]>([defaultCategoryElement]) //TODO: load categorys here

  const [bookings, setBookings] = useState<BookingElement[]>([ //TODO: load items here
    {date: new Date(), amount: -10, name: "test", category: defaultCategoryElement},
    {date: new Date(), amount: -10, name: "test", category: defaultCategoryElement},
    {date: new Date(), amount: -10, name: "test", category: defaultCategoryElement},
    {date: new Date(), amount: -10, name: "test", category: defaultCategoryElement},
    {date: new Date(), amount: -10, name: "test", category: defaultCategoryElement}
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
   * renders the booking list screen and its interaction components
   */
  const renderBookingList = (): JSX.Element => {

    /**
     * handles the Add Booking button press event
     * @param e the pressEvent returned from the test
     */
    const onAddBookingPressed = (e: Event): void => { //TODO: inline?
      setModalVisible(true)
    }

    /**
     * handles the addition of a booking item
     * @param item the item to be added
     */
    const addBookingItem = (item: BookingElement): void => { //TODO: rename
      setBookings([item, ...bookings])
    }

    return(
      <SafeAreaView>
        <AddBookingPopup categorys={categorys} visible={modalVisible} setModalVisible={setModalVisible} addItem={addBookingItem} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>

            <View>
              <BookingList bookings={bookings} />

              <Button
                onPress={(e: Event) => onAddBookingPressed(e)}
                title="Add Booking"
                color="#841584"
                accessibilityLabel="Add Item to the budget list" />
            </View>
          </ScrollView>
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
        return renderBookingList()
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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MobileNumberEntryScreen from '../screens/login/MobileNumberEntryScreen';
import UserNameEntryScreen from '../screens/login/UserNameEntryScreen';
import PanCardScreen from '../screens/login/PanCardScreen';
import ServiceDeliveryScreen from '../screens/login/ServiceDeliveryScreen';
import HomeScreen from '../screens/HomeScreen';
import LocationScreen from '../screens/login/LocationScreen';
import SearchCategoryScreen from '../screens/login/SearchCategoryScreen';
import HistoryScreen from '../screens/history & preview/HistoryScreen';
import WriteAboutStoreScreen from '../screens/login/WriteAboutStoreScreen';
import ProfileScreen from '../screens/menu & profile/ProfileScreen';
import MenuScreen from '../screens/menu & profile/MenuScreen';

import ModalScreen from '../components/ModalScreen';
import CameraScreen from '../screens/utils/CameraScreen';
import AddImageScreen from '../screens/login/AddImageScreen';
import ImagePreview from '../screens/login/ImagePreview'; 
import RequestPage from '../screens/requests/RequestPage';
import BidPageInput from '../screens/requests/BidPageInput';
import BidPageImageUpload from '../screens/requests/BidPageImageUpload';
import BidOfferedPrice from '../screens/requests/BidOfferedPrice';
import BidPreviewPage from '../screens/requests/BidPreviewPage';
import AboutScreen from '../screens/menu & profile/AboutScreen';
import HelpScreen from '../screens/menu & profile/HelpScreen';
import BidQueryPage from '../screens/requests/BidQueryPage';
import ViewRequestScreen from '../screens/requests/ViewRequestScreen';
import SplashScreen from '../screens/SplashScreen';
import MessageLoaderSkeleton from '../screens/utils/MessageLoaderSkeleton';
import CompleteProfile from '../components/CompleteProfile';
import TermsandConditions from '../screens/menu & profile/TermsandConditions';
import PaymentScreen from '../screens/utils/paymentGateway/PaymentScreen';
import { useSelector } from 'react-redux';
import CustomerReport from '../screens/reports/CustomerReport';
import GSTDocumentVerify from '../screens/login/GSTDocumentVerify';
import UpdateCategory from '../screens/login/UpdateCategory';
import UpdateLocation from '../screens/login/UpdateLocation';
import ProfileImageUpdate from '../screens/login/ProfileImageUpdate';
import SendDocument from '../components/SendDocument';
import UpdateServiceDelivery from '../screens/login/UpdateServiceDelivery';
import UpdateStoreDescription from '../screens/login/UpdateStoreDescription';
import AddProductImages from '../screens/login/AddProductImages';
import SendOffer from '../screens/requests/SendOffer';
import ImageReferences from '../screens/requests/ImageReferences';

const Stack = createNativeStackNavigator();
const GlobalNavigation = () => {
  const [userId, setUserId] = useState("")


  const currentRequest = useSelector(
    (state) => state.requestData.currentRequest
  );
  const chatUserId = currentRequest?.requestId;
  console.log("Chat User ID in App.js:", chatUserId);
  useEffect(() => {
    setUserId(chatUserId);
  }, [chatUserId]);


  return (

    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: "50"
      }}
    >
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="loader" component={MessageLoaderSkeleton} />

      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="mobileNumber" component={MobileNumberEntryScreen} />
      <Stack.Screen name="registerUsername" component={UserNameEntryScreen} />
      <Stack.Screen name="panCard" component={PanCardScreen} />
      <Stack.Screen name="serviceDelivery" component={ServiceDeliveryScreen} />
      <Stack.Screen name="locationScreen" component={LocationScreen} />
      <Stack.Screen name="searchCategory" component={SearchCategoryScreen} />
      <Stack.Screen name="writeAboutStore" component={WriteAboutStoreScreen} />
      <Stack.Screen name="completeProfile" component={CompleteProfile} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="menu" component={MenuScreen} />
      <Stack.Screen name="modal" component={ModalScreen} />
      <Stack.Screen name="camera" component={CameraScreen} />
      <Stack.Screen name="addImg" component={AddImageScreen} />
      <Stack.Screen name="imagePreview" component={ImagePreview} />
      <Stack.Screen name="payment-gateway" component={PaymentScreen} />
      <Stack.Screen name="customer-report" component={CustomerReport} />
      <Stack.Screen name="gstVerify" component={GSTDocumentVerify} />
      <Stack.Screen name="update-category" component={UpdateCategory} />
      <Stack.Screen name="update-location" component={UpdateLocation} />
      <Stack.Screen name="update-profile-image" component={ProfileImageUpdate} />
      <Stack.Screen name="add-product-images" component={AddProductImages} />

      <Stack.Screen name="update-service-delivery" component={UpdateServiceDelivery} />
      <Stack.Screen name="update-store-description" component={UpdateStoreDescription} />


      <Stack.Screen name={`requestPage${userId}`} component={RequestPage} />
      {/* <Stack.Screen name="requestPage" component={RequestPage}  />  */}
      <Stack.Screen name="bidPageInput" component={BidPageInput} />
      <Stack.Screen name="bidPageImageUpload" component={BidPageImageUpload} />
      <Stack.Screen name="bidOfferedPrice" component={BidOfferedPrice} />
      <Stack.Screen name="bidPreviewPage" component={BidPreviewPage} />
      <Stack.Screen name="send-offer" component={SendOffer} />

      <Stack.Screen name="bidQuery" component={BidQueryPage} />
      <Stack.Screen name="history" component={HistoryScreen} />
      <Stack.Screen name="about" component={AboutScreen} />
      <Stack.Screen name="termsandconditions" component={TermsandConditions} />
      <Stack.Screen name="help" component={HelpScreen} />
      <Stack.Screen name="viewrequest" component={ViewRequestScreen} />
      <Stack.Screen name="send-document" component={SendDocument} />
      <Stack.Screen name="image-refrences" component={ImageReferences}/>
    </Stack.Navigator>
  )
}

export default GlobalNavigation;
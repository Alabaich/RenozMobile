export type RootStackParamList = {
    Home: undefined;
    Search: undefined;
    Notifications: undefined;
    Profile: undefined;
    Cart: undefined;
    Categories: undefined; 
    Products: undefined;
    Collections: undefined;
    CollectionProducts: {
      collectionId: string;
      collectionName: string;
      showFilterModal: any;
    };
    ProductDetail: { productId: string };
    FilterScreen: {
      collectionId: string;
      // Include other parameters if necessary
    };
  };
  
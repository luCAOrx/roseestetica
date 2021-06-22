import '@react-navigation/native/lib/typescript/src/types';

declare module '@react-navigation/native/lib/typescript/src/types' {
  export declare type CustomTheme = {
    dark: boolean;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      detailHeaderBackground: string;
      card: string;
      text: string;
      price: string;
      buttonPrimaryBackground: string;
      buttonSecondaryBackground: string;
      buttonTertiaryBackground: string;
      buttonText: string;
      separator: string;
      border: string;

      currentStepLabelColor: string;
  
      stepStrokeCurrentColor: string;
    
      stepIndicatorLabelCurrentColor: string;
      stepIndicatorCurrentColor: string;
      stepIndicatorFinishedColor: string;
      stepIndicatorUnFinishedColor: string;
      stepIndicatorLabelFinishedColor: string;
      stepIndicatorLabelUnFinishedColor: string;
    
      separatorFinishedColor: string;
      separatorUnFinishedColor: string;
    };
  };
};
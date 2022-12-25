import { useActionSheet } from '@expo/react-native-action-sheet'

export default function triggerActionSheet(options) {

    const { showActionSheetWithOptions } = useActionSheet();

    const onPress = () => {
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 2;
        const title = "Filter by"
    
        showActionSheetWithOptions(
          {
            options,
            title
          }
        );
      }

      return (onPress)

}
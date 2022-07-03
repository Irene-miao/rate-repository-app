import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import theme from '../theme';



const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    margin: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
    margin: 5,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    marginLeft: 10,
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
    borderColor: "#1E90FF",
    backgroundColor: "white",
    borderWidth: 3,
  },
  roundButtonText: {
    color: "#1E90FF",
    fontSize: 18,
    fontWeight: theme.fontWeights.bold,
  },
  header: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  subheading: {
    color: "grey",
    fontSize: theme.fontSizes.subheading,
  }, 
  paragraph: {
    marginLeft: 60,
  }
});



const ReviewItem = ({ review }) => {
    const date = new Date(review.createdAt);
    const newDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    
    
      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.roundButton}>
              <Text style={styles.roundButtonText}>{review.rating}</Text>
            </TouchableOpacity>
            <View style={styles.column}>
            <Text style={styles.header}>{review?.repository?.ownerName} / {review?.repository?.name}</Text>
            <Text style={styles.subheading}>{newDate}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.paragraph}>{review.text}</Text>
          </View>
        </View>
      );
    };

    export default ReviewItem;
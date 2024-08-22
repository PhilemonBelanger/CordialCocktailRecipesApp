import { Card, IconButton, Avatar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "~/Constants/theme";
import { formatIngredientsString, isCocktailAvailable } from "~/Utils/cocktails.utils";
import { capitalizeFirstLetter } from "~/Utils/string.utils";
import { ENABLE_SUBTITLE_DYNAMIC_LISTINGS, NOOP, SHOW_IMAGES } from "~/Constants/constants";
import { getCocktailImage } from "~/Utils/images.utils";
import {
  selectedProfileCocktailIsInFavoritesSelector,
  selectedProfileIDSelector,
  selectedProfileOwnedIngredientsSelector,
} from "~/Utils/selectors.utils";
import { toggleFavoritedCocktail } from "~/Reducers/profilesActions";
import { useEffect, useState } from "react";

const CocktailCard = ({ item = {}, allIngredients = [], onCardPress = NOOP }) => {
  const dispatch = useDispatch();
  const selectedProfileID = useSelector(selectedProfileIDSelector);
  const ownedIngredientIDs = useSelector(selectedProfileOwnedIngredientsSelector);
  const favorite = useSelector((state) => selectedProfileCocktailIsInFavoritesSelector(state, item.id));
  const toggleFavorite = () => {
    dispatch(toggleFavoritedCocktail({ profileID: selectedProfileID, cocktailID: item.id }));
  };
  const ingredientsString = ENABLE_SUBTITLE_DYNAMIC_LISTINGS
    ? formatIngredientsString(item.ingredients, allIngredients, ownedIngredientIDs)
    : "";
  const available = isCocktailAvailable(item.ingredients, allIngredients, ownedIngredientIDs);
  const titleString = capitalizeFirstLetter(item.name);

  const [cocktailImage, setCocktailImage] = useState();

  useEffect(() => {
    setCocktailImage(item?.uri ? { uri: item?.uri } : getCocktailImage(item.id));
  }, [item]);

  return (
    <Card onPress={onCardPress} style={available ? styles.cardAvailable : styles.card}>
      <Card.Title
        title={titleString}
        //titleVariant={"bodyMedium"}
        //subtitleVariant={"bodySmall"}
        subtitle={ingredientsString}
        subtitleNumberOfLines={2}
        subtitleStyle={{ color: "grey" }}
        leftStyle={styles.imageStyle}
        left={
          SHOW_IMAGES
            ? cocktailImage
              ? () => <Avatar.Image size={60} source={cocktailImage} />
              : () => <Avatar.Text size={60} label="" />
            : undefined
        }
        right={() => <IconButton icon="star" mode={"contained"} selected={favorite} onPress={toggleFavorite} />}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 80,
    marginHorizontal: 6,
    marginVertical: 3,
    backgroundColor: theme.colors.surface,
  },
  cardAvailable: {
    height: 80,
    marginHorizontal: 6,
    marginVertical: 3,
    backgroundColor: theme.colors.primaryContainer,
  },
  imageStyle: {
    left: -10,
    top: 3,
    marginRight: 20,
  },
});

export default CocktailCard;

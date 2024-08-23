import { Portal, Button, Dialog, TextInput } from "react-native-paper";
import { View, Dimensions, StyleSheet } from "react-native";
import { useModalToggler } from "~/Hooks/useModalToggler";
import { useEffect, useState } from "react";
import { theme } from "~/Constants/theme";
import DropDownPicker from "react-native-dropdown-picker";
import { profileDataSelector, profileSelector, selectedProfileIDSelector } from "~/Utils/selectors.utils";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_NEW_PROFILE_ID, DEFAULT_PROFILE_ID } from "~/Reducers/profilesReducer";
import { createProfile, deleteProfile, setSelectedProfileIDAction, updateProfile } from "~/Reducers/profilesActions";
import { ConfirmationDialog } from "./ConfirmationDialog";

export const ProfileSelectorModal = () => {
  const dispatch = useDispatch();
  const [isVisible, hideModal, showModal] = useModalToggler();
  const allProfilesData = useSelector(profileDataSelector);
  const currentSelectedProdileID = useSelector(selectedProfileIDSelector);
  const [selectedProfileID, setSelectedProfileID] = useState(currentSelectedProdileID);
  const [profileName, setProfileName] = useState("");
  const [profilesData, setProfilesData] = useState(allProfilesData);
  const [showDropDown, setShowDropDown] = useState(false);
  const selectedProfile = useSelector((state) => profileSelector(state, selectedProfileID));

  useEffect(() => {
    setProfileName(
      selectedProfileID?.toString() === CREATE_NEW_PROFILE_ID?.toString() ? "New Profile" : selectedProfile?.name ?? ""
    );
  }, [selectedProfile]);

  useEffect(() => {
    if (allProfilesData) {
      setProfilesData(allProfilesData);
    }
  }, [allProfilesData]);

  useEffect(() => {
    setSelectedProfileID(currentSelectedProdileID);
  }, [currentSelectedProdileID]);

  const handleOk = () => {
    if (selectedProfileID?.toString() === CREATE_NEW_PROFILE_ID?.toString()) {
      const newProfileID = Date.now();
      dispatch(createProfile({ id: newProfileID, name: profileName }));
      dispatch(setSelectedProfileIDAction({ id: newProfileID }));
    } else {
      if (selectedProfile.name !== profileName) {
        dispatch(updateProfile({ ...selectedProfile, name: profileName }));
      }
      dispatch(setSelectedProfileIDAction({ id: selectedProfileID }));
    }
    hideModal();
  };

  const handleDelete = () => {
    dispatch(deleteProfile({ id: selectedProfileID }));
    setSelectedProfileID(currentSelectedProdileID);
    hideModal();
  };

  const [isDeleteVisible, hideDeleteModal, showDeleteModal] = useModalToggler();

  return (
    <View>
      <Portal>
        <Dialog visible={isVisible} onDismiss={hideModal}>
          <Dialog.Content>
            <DropDownPicker
              open={showDropDown}
              value={selectedProfileID}
              items={profilesData}
              setOpen={setShowDropDown}
              setValue={setSelectedProfileID}
              setItems={setProfilesData}
              searchable={true}
              placeholder="Profile"
              searchPlaceholder="Search"
              listMode="MODAL"
            />
            <TextInput
              label="Edit Profile Name"
              value={profileName}
              onChangeText={setProfileName}
              mode="outlined"
              style={styles.text}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              onPress={handleOk}
              style={{ marginVertical: 10, width: "30%" }}
              disabled={!(selectedProfile || selectedProfileID?.toString() === CREATE_NEW_PROFILE_ID?.toString())}
            >
              Ok
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                hideModal();
              }}
              style={{ marginVertical: 10, width: "30%" }}
            >
              Cancel
            </Button>
            {selectedProfile &&
              selectedProfileID?.toString() &&
              selectedProfileID?.toString() !== CREATE_NEW_PROFILE_ID?.toString() &&
              selectedProfileID?.toString() !== DEFAULT_PROFILE_ID?.toString() &&
              selectedProfileID?.toString() !== currentSelectedProdileID?.toString() && (
                <Button
                  mode="contained"
                  onPress={showDeleteModal}
                  style={{ marginVertical: 10, backgroundColor: theme.colors.error, width: "30%" }}
                >
                  Delete
                </Button>
              )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ConfirmationDialog
        isVisible={isDeleteVisible}
        onOkPress={handleDelete}
        hideDialog={hideDeleteModal}
        text="Are you sure you want to delete this profile permanently?"
      />
      <Button icon="account" mode="contained" onPress={showModal} style={{ marginVertical: 10 }}>
        Change Profile: {profileName}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.8,
    backgrournColor: theme.colors.surfaceVariant,
  },
  text: {
    marginVertical: 5,
  },
});

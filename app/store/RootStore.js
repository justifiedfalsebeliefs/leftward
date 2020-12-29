import { makeObservable, observable, action, reaction, when } from "mobx";
import getData from "../data/getData";
import pushData from "../data/pushData";

export default class RootStore {
  // Main State
  progression = false;
  progressionShouldUpdate = true;
  curated = false;
  curatedShouldUpdate = true;
  saved = false;
  savedShouldUpdate = true;
  completed = false;
  completedShouldUpdate = true;
  // Hidden Actions Screen
  listingsHidden = false;
  listingsHiddenShouldUpdate = true;
  // Modals
  testModalVisible = false;
  levelUpVisible = false;

  constructor() {
    makeObservable(this, {
      // Main State
      progression: observable,
      progressionShouldUpdate: observable,
      curated: observable,
      curatedShouldUpdate: observable,
      saved: observable,
      savedShouldUpdate: observable,
      completed: observable,
      completedShouldUpdate: observable,
      updateProgression: action,
      updateProgressionShouldUpdate: action,
      updateCurated: action,
      updateCuratedShouldUpdate: action,
      updateSaved: action,
      updateSavedShouldUpdate: action,
      updateCompleted: action,
      updateCompletedShouldUpdate: action,
      // ActionDetails Screen
      updateActionState: action,
      // Hidden Actions Screen
      listingsHidden: observable,
      listingsHiddenShouldUpdate: observable,
      updateListingsHidden: action,
      updateListingsHiddenShouldUpdate: action,
      // Modals
      testModalVisible: observable,
      updateTestModalVisible: action,
      levelUpVisible: observable,
      updateLevelUpVisible: action,
    });
  }

  // Main State
  updateCurated() {
    if (this.curatedShouldUpdate == true) {
      getData(
        "populateState",
        (params = [{ key: "curated", value: true }])
      ).then(
        action((data) => {
          this.curated = data.curated;
          this.updateCuratedShouldUpdate(false);
        })
      );
    }
  }

  updateCuratedShouldUpdate(updateValue) {
    this.curatedShouldUpdate = updateValue;
    this.updateCurated();
  }

  updateProgression = async () => {
    if (this.progressionShouldUpdate == true) {
      getData(
        "populateState",
        (params = [{ key: "progression", value: true }])
      ).then(
        action((data) => {
          this.progression = data.progression;
          this.updateProgressionShouldUpdate(false);
        })
      );
    }
  };

  updateProgressionShouldUpdate(updateValue) {
    this.PprogressionShouldUpdate = updateValue;
    this.updateProgression();
  }

  updateSaved() {
    if (this.savedShouldUpdate == true) {
      getData("populateState", (params = [{ key: "saved", value: true }])).then(
        action((data) => {
          this.saved = data.saved;
          this.updateSavedShouldUpdate(false);
        })
      );
    }
  }

  updateSavedShouldUpdate(updateValue) {
    this.savedShouldUpdate = updateValue;
    this.updateSaved();
  }

  updateCompleted() {
    if (this.completedShouldUpdate == true) {
      getData(
        "populateState",
        (params = [{ key: "completed", value: true }])
      ).then(
        action((data) => {
          this.completed = data.completed;
          this.updateCompletedShouldUpdate(false);
        })
      );
    }
  }

  updateCompletedShouldUpdate(updateValue) {
    this.completedShouldUpdate = updateValue;
    this.updateCompleted();
  }

  updateActionState = async (actionId, state, reward, cause) => {
    pushData(
      "updateUserAction",
      (params = [
        { key: "actionId", value: actionId },
        { key: "actionState", value: state },
        { key: "reward", value: reward },
        { key: "cause", value: cause },
      ])
    ).then(
      action((data) => {
        this.updateCuratedShouldUpdate(true);
        this.updateProgressionShouldUpdate(true);
        this.updateSavedShouldUpdate(true);
        this.updateCompletedShouldUpdate(true);
        //this.updateListingsHiddenShouldUpdate(true);
        if (data.levelUp) {
          console.log("Level up!");
          this.updateLevelUpVisible(true);
        }
      })
    );
  };

  // Hidden Actions Screen
  updateListingsHidden() {
    if (this.listingsHiddenShouldUpdate == true) {
      getData("fetchHiddenActions").then(
        action((data) => {
          this.listingsHidden = data;
          this.updateListingsHiddenShouldUpdate(false);
        })
      );
    }
  }

  updateListingsHiddenShouldUpdate(updateValue) {
    this.listingsHiddenShouldUpdate = updateValue;
    this.updateListingsHidden();
  }

  // Modals
  updateTestModalVisible(updateValue) {
    this.testModalVisible = updateValue;
  }

  updateLevelUpVisible(updateValue) {
    this.levelUpVisible = updateValue;
  }
}

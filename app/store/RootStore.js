import { makeObservable, observable, action, reaction, when } from "mobx";
import getData from "../data/getData";

export default class RootStore {
  // Main State
  isLoading = false;
  appStateShouldUpdate = true;
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
  actionCompleteModalVisible = false;

  constructor() {
    makeObservable(this, {
      // Main State
      isLoading: observable,
      appStateShouldUpdate: observable,
      progression: observable,
      progressionShouldUpdate: observable,
      curated: observable,
      curatedShouldUpdate: observable,
      saved: observable,
      savedShouldUpdate: observable,
      completed: observable,
      completedShouldUpdate: observable,
      updateIsLoading: action,
      updateAppState: action,
      updateAppStateShouldUpdate: action,
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
      actionCompleteModalVisible: observable,
      updateActionCompleteModalVisible: action,
    });
  }

  // Main State
  updateIsLoading(updateValue) {
    this.isLoading = updateValue;
  }
  updateAppState() {
    if (this.appStateShouldUpdate == true) {
      getData("populateState", {
        curated: true,
        progression: true,
        saved: true,
        completed: true,
      }).then(
        action((data) => {
          this.curated = data.curated;
          this.progression = data.progression;
          this.saved = data.saved;
          this.completed = data.completed;
          this.updateAppStateShouldUpdate(false);
        })
      );
    }
  }

  updateAppStateShouldUpdate(updateValue) {
    this.appStateShouldUpdate = updateValue;
    this.updateAppState();
  }

  updateCurated() {
    if (this.curatedShouldUpdate == true) {
      getData("populateState", {
        curated: true,
      }).then(
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
      getData("populateState", {
        progression: true,
      }).then(
        action((data) => {
          this.progression = data.progression;
          this.updateProgressionShouldUpdate(false);
        })
      );
    }
  };

  updateProgressionShouldUpdate(updateValue) {
    this.progressionShouldUpdate = updateValue;
    this.updateProgression();
  }

  updateSaved() {
    if (this.savedShouldUpdate == true) {
      getData("populateState", {
        saved: true,
      }).then(
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
      getData("populateState", {
        completed: true,
      }).then(
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
    getData("updateUserAction", {
      actionId: actionId,
      actionState: state,
      reward: reward,
      cause: cause,
    }).then(
      action((data) => {
        this.updateAppStateShouldUpdate(true);
        //this.updateListingsHiddenShouldUpdate(true);
        if (data.levelUp) {
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
  updateActionCompleteModalVisible(updateValue) {
    this.actionCompleteModalVisible = updateValue;
  }
}

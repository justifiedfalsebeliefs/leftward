import { makeAutoObservable, makeObservable, observable, action } from 'mobx';
import getData from '../data/getData'
import pushData from '../data/pushData'

export default class RootStore {
    // Dashboard Screen
    dashboardActionListings = false
    dashboardActionListingsShouldUpdate = true
    userStatistics = false
    userStatisticsShouldUpdate = true    
    // Statistics Screen
    listingsInProgress = false
    listingsInProgressShouldUpdate = true
    listingsCompleted = false
    listingsCompletedShouldUpdate = true
    // Hidden Actions Screen
    listingsHidden = false
    listingsHiddenShouldUpdate = true

    constructor(){
        makeObservable(this, {
            // Dashboard Screen
            dashboardActionListings: observable,
            dashboardActionListingsShouldUpdate: observable,
            userStatistics: observable,
            userStatisticsShouldUpdate: observable,
            updateDashboardActionListings: action,
            updateDashboardActionListingsShouldUpdate: action,
            updateUserStatistics: action,
            updateUserStatisticsShouldUpdate: action,
            // ActionDetails Screen
            updateActionStatus: action,
            // Statistics Screen
            listingsInProgress: observable,
            listingsInProgressShouldUpdate: observable,
            listingsCompleted: observable,
            listingsCompletedShouldUpdate: observable,
            updateListingsInProgress: action,
            updateListingsInProgressShouldUpdate: action,
            updateListingsCompleted: action,
            updateListingsCompletedShouldUpdate: action,
            // Hidden Actions Screen
            listingsHidden: observable,
            listingsHiddenShouldUpdate: observable,
            updateListingsHidden: action,
            updateListingsHiddenShouldUpdate: action,
        });
    }

    // Dashboard Screen
    updateDashboardActionListings() {
        if (this.dashboardActionListingsShouldUpdate == true) {
            console.log("updating dashboard listings")
            getData("fetchDashboardListings").then(
                action(data => {
                    this.dashboardActionListings = data;
                    this.updateDashboardActionListingsShouldUpdate(false)
                })
            )
        }
    }
    
    updateDashboardActionListingsShouldUpdate(updateValue) {
        this.dashboardActionListingsShouldUpdate = updateValue
        this.updateDashboardActionListings()
    }

    updateUserStatistics = async () => {
        if (this.userStatisticsShouldUpdate == true) {
            console.log("updating user statistics")
            getData("fetchUserExperience").then(
                action(data => {
                    this.userStatistics = data[0];
                    this.updateUserStatisticsShouldUpdate(false)
                })
            )
        }
    }

    updateUserStatisticsShouldUpdate(updateValue) {
        this.userStatisticsShouldUpdate = updateValue
        this.updateUserStatistics()
    }

    updateActionStatus = async (status, actionId) => {
        pushData("pushActionStatus", params = [{key:"statusUpdate", value:status}, {key:"actionId", value:actionId}]).then(
            action(data => {
                this.updateDashboardActionListingsShouldUpdate(true);
                this.updateUserStatisticsShouldUpdate(true);
                this.updateListingsInProgressShouldUpdate(true)
                this.updateListingsCompletedShouldUpdate(true)
                this.updateListingsHiddenShouldUpdate(true)
                })
        )
    }

    // Statistics Screen
    updateListingsInProgress() {
        if (this.listingsInProgressShouldUpdate == true) {
            getData("fetchMyActions").then(
                action(data => {
                    this.listingsInProgress = data;
                    this.updateListingsInProgressShouldUpdate(false)
                })
            )
        }
    }

    updateListingsInProgressShouldUpdate(updateValue) {
        this.listingsInProgressShouldUpdate = updateValue
        this.updateListingsInProgress()
    }

    updateListingsCompleted() {
        if (this.listingsCompletedShouldUpdate == true) {
            getData("fetchCompletedActions").then(
                action(data => {
                    this.listingsCompleted = data;
                    this.updateListingsCompletedShouldUpdate(false)
                })
            )
        }
    }

    updateListingsCompletedShouldUpdate(updateValue) {
        this.listingsCompletedShouldUpdate = updateValue
        this.updateListingsCompleted()
    }
    // Hidden Actions Screen
    updateListingsHidden() {
        if (this.listingsHiddenShouldUpdate == true) {
            getData("fetchHiddenActions").then(
                action(data => {
                    this.listingsHidden = data;
                    this.updateListingsHiddenShouldUpdate(false)
                })
            )
        }
    }

    updateListingsHiddenShouldUpdate(updateValue) {
        this.listingsHiddenShouldUpdate = updateValue
        this.updateListingsHidden()
    }

}

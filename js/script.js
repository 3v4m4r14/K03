var vm = new Vue({
    el: "#app",
    data: function () {
        return {
            currentIndex: 0,
            students: [
                { code: "155408IAPB", name: "Eva Maria Veitmaa" },
                { code: "155202IAPB", name: "Ingmar Trump" }
            ],
            works: [
            {
                studentCodeOne: "155408IAPB",
                studentCodeTwo: "155202IAPB", 
                dijkstraAddress: "evveit",
                requiements: {
                    waitingLine: false,
                    sorting: false,
                    extraTask: false,
                    lives: false,
                    restarting: false,
                    animations: false
                }, 
                alternativeRequirements: false,
                requiementsComment: "",
                extras: {
                    goodDesign: false,
                    designSupportsTheme: false,
                    goodAppearances: false,
                    goodSortingFeedback: false,
                    goodExtraTaskEpisode: false,
                    goodFailureFeedback: false,
                    feedbackSound: false,
                    learnability: false,
                    dragAndDrop: false,
                    responsiveDesign: false
                }, 
                extraExtraPoints: 0,
                extraPenalty: 0, 
                extrasComments: "", 
                submitted: "onTime", 
                submittedComment: ""
            }]
        }
    },
    computed: {
        current: function () {
            return this.works[this.currentIndex];
        },
        isBaseDone: function () {
            if (this.current.requiements.alternativeRequirements) return true; 
            for (key in this.current.requiements) {
                if (!this.current.requiements[key]) return false;
            }
            return true;
        },
        isBaseDoneString: function () {
            return this.isBaseDone ? "Korras" : "Puudulik";
        },
        extraPointsTotal: function () {
            var total = 0;
            for (key in this.current.extras) {
                if (this.current.extras[key]) {
                    total++;
                }
            }
            return total;
        },
        latePenaltyTotal: function () {
            if (this.current.submitted === "lateForMore") {
                return -5
            }
            if (this.current.submitted === "lateOneWeek") {
                return -2;
            }
            if (this.current.submitted === "onTime") {
                return 0;
            }
        },
        pointsTotal: function () {
            if (!this.isBaseDone) return 0;
            return 10 + this.extraPointsTotal + this.current.extraPenalty + this.latePenaltyTotal;
        }, 
        address: function() {
            return "http://dijkstra.cs.ttu.ee/~" + this.current.dijkstraAddress + "/ui/t2/";
        }
    },
    methods: {}
});

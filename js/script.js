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
                dijkstraAddress: "CLICKABLE AND VERY LONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNG ADDRESS", 
                requirements: {
                    waitingLine: true,
                    sorting: true,
                    extraTask: true,
                    lives: false,
                    restarting: true,
                    animations: true
                }, 
                alternativeRequirements: false,
                requirementsComment: "Elud puudu.",
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
                    responsiveDesign: false,
                }, 
                extraExtraPoints: 0,
                extraPenalty: 0, 
                extrasComment: "", 
                submitted: "onTime", 
                submittedComment: "1 nädal pikendust."
            }]
        }
    },
    computed: {
        current: function () {
            return this.works[this.currentIndex];
        },
        isBaseDone: function () {
            if (this.current.alternativeRequirements) return true; 
            for (key in this.current.requirements) {
                if (!this.current.requirements[key]) return false;
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
            total += Math.abs(parseInt(this.current.extraExtraPoints)) - Math.abs(parseInt(this.current.extraPenalty));
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
            return 10 + this.extraPointsTotal + this.latePenaltyTotal;
        }, 
        address: function() {
            return "http://dijkstra.cs.ttu.ee/~" + this.current.dijkstraAddress + "/ui/t2/";
        }
    },
    methods: {}
});

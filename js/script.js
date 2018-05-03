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
                taskType: "regular",
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
                    responsiveDesign: false
                }, 
                extraExtraPoints: 0,
                extrasComment: "", 
                submitted: "onTime", 
                submittedComment: "1 nädal pikendust.", 
                projectPoints: 0, 
                projectComment: ""
            }]
        }
    },
    computed: {
        current: function () {
            return this.works[this.currentIndex];
        },
        isBaseDone: function () {
            for (key in this.current.requirements) {
                if (!this.current.requirements[key]) return false;
            }
            return true;
        },
        isBaseDoneString: function () {
            var baseStatus = $('#baseStatus');
            if (this.isBaseDone) {
                baseStatus.removeClass("req");
                baseStatus.addClass("ok");
                this.current.alternativeRequirements = true;
                return "Korras";
            } else if (this.current.alternativeRequirements) {
                baseStatus.removeClass("req");
                baseStatus.addClass("ok");
                this.current.alternativeRequirements = true;
                return "Korras";
            } else {
                baseStatus.removeClass("ok");
                baseStatus.addClass("req");
                this.current.alternativeRequirements = false;
                return "Puudulik";
            }
        },
        extraPointsTotal: function () {
            var total = 0;
            for (key in this.current.extras) {
                if (this.current.extras[key]) {
                    total++;
                }
            }
            total += parseInt(this.current.extraExtraPoints);
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
            if (this.taskTypeIsProject) {
                return parseInt(this.current.projectPoints) + parseInt(this.latePenaltyTotal);
            }
            if (!this.isBaseDone) return 0;
            return 10 + this.extraPointsTotal + this.latePenaltyTotal;
        }, 
        address: function() {
            return "http://dijkstra.cs.ttu.ee/~" + this.current.dijkstraAddress + "/ui/t2/";
        },
        taskTypeIsRegular: function () {
            return this.current.taskType === "regular";
        },
        taskTypeIsProject: function () {
            return this.current.taskType === "project";
        }
    },
    methods: {}
});

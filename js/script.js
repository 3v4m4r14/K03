var vm = new Vue({
    el: "#app",
    data: function () {
        return {
            studentCodeOne: "",
            studentCodeTwo: "",
            dijkstraName: "",
            submissionSelection: "onTime",
            penalty: 0,
            mainPoints: {
                waitingLinePoints: 0,
                sortingPoints: 0,
                extraTaskPoints: 0,
                livesPoints: 0,
                restartPoints: 0,
                animationPoints: 0,
                total: 0
            },
            extraPoints: {
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
                total: 0
            }
        }
    },
    computed: {
        mainPointsTotal: function () {
            this.mainPoints.total = parseInt(this.mainPoints.waitingLinePoints)
                + parseInt(this.mainPoints.sortingPoints)
                + parseInt(this.mainPoints.extraTaskPoints)
                + parseInt(this.mainPoints.livesPoints)
                + parseInt(this.mainPoints.restartPoints)
                + parseInt(this.mainPoints.animationPoints);
            return this.mainPoints.total;
        },
        extraPointsTotal: function () {
            this.extraPoints.total = 0;
            for (item in this.extraPoints) {
                if (this.extraPoints[item] === true) {
                    this.extraPoints.total++;
                }
            }
            return this.extraPoints.total;
        },
        latePenaltyTotal: function () {
            if (this.submissionSelection === "onTime") {
                this.penalty = 0;
            }
            if (this.submissionSelection === "lateOneWeek") {
                this.penalty = -2;
            }
            if (this.submissionSelection === "lateForMore") {
                this.penalty = -5
            }
            return this.penalty;
        },
        pointsTotal: function () {
            return this.mainPoints.total + this.extraPoints.total + this.penalty;
        }
    },
    methods: {}
});
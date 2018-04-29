var vm = new Vue({
    el: "#app",
    data: function () {
        return {
            studentCodeOne: "",
            studentCodeTwo: "",
            dijkstraName: "",
            submissionSelection: "onTime",
            mainPoints: {
                waitingLinePoints: 0,
                sortingPoints: 0,
                extraTaskPoints: 0,
                livesPoints: 0,
                restartPoints: 0,
                animationPoints: 0
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
                responsiveDesign: false
            }
        }
    },
    computed: {
        mainPointsTotal: function () {
            return parseInt(this.mainPoints.waitingLinePoints)
                + parseInt(this.mainPoints.sortingPoints)
                + parseInt(this.mainPoints.extraTaskPoints)
                + parseInt(this.mainPoints.livesPoints)
                + parseInt(this.mainPoints.restartPoints)
                + parseInt(this.mainPoints.animationPoints)
        },
        extraPointsTotal: function () {
            var total = 0;
            for (item in this.extraPoints) {
                if (this.extraPoints[item] === true) {
                    total++;
                }
            }
            return total;
        }
    },
    methods: {}
});
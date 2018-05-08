var vm = new Vue({
    el: "#app",
    data: function () {
        return {
            deadline: new Date("2015-05-02"),
            currentIndex: 0,
            students: [
                {code: "155408IAPB", name: "Eva Maria Veitmaa"},
                {code: "155202IAPB", name: "Ingmar Trump"}
            ],
            works: [
                {
                    studentCodeOne: "",
                    studentCodeTwo: "",
                    dijkstraAddress: "",
                    taskType: "regular",
                    requirements: {
                        waitingLine: false,
                        sorting: false,
                        extraTask: false,
                        lives: false,
                        restarting: false,
                        animations: false
                    },
                    alternativeRequirements: false,
                    requirementsComment: "",
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
                    submittedComment: "",
                    projectPoints: 0,
                    projectComment: ""
                },
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
        baseTasksAreDone: function () {
            for (key in this.current.requirements) {
                if (!this.current.requirements[key]) return false;
            }
            return true;
        },
        hasRequiredComment: function () {
            return this.current.requirementsComment !== "";
        },
        baseIsDone: function () {
            return this.baseTasksAreDone || (this.current.alternativeRequirements && this.hasRequiredComment);
        },
        requireComment: function () {
            return !this.baseTasksAreDone && this.current.alternativeRequirements && !this.hasRequiredComment;
        },
        baseCompletionMsg: function () {
            var baseStatus = $('#baseStatus');
            var requirementsComment = $('#requirementsComment');
            requirementsComment.removeAttr('required');
            if (this.baseTasksAreDone) {
                baseStatus.removeClass("req");
                baseStatus.addClass("ok");
                this.current.alternativeRequirements = true;
                return "Korras";
            } else if (this.baseIsDone) {
                baseStatus.removeClass("req");
                baseStatus.addClass("ok");
                return "Korras";
            } else if (this.current.alternativeRequirements && !this.hasRequiredComment) {
                baseStatus.removeClass("ok");
                baseStatus.addClass("req");
                requirementsComment.attr('required', '');
                return "Puudulik";
            } else {
                baseStatus.removeClass("ok");
                baseStatus.addClass("req");
                return "Puudulik";
            }
        },
        baseTaskPointsTotal: function () {
            var total = 0;
            for (key in this.current.requirements) {
                if (this.current.requirements[key]) total++;
            }
            return total;
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
            if (!this.baseIsDone) return 0;
            return 10 + this.extraPointsTotal + this.latePenaltyTotal;
        },
        address: function () {
            if (!this.validDijkstra) return "Väli täitmata";
            return "http://dijkstra.cs.ttu.ee/~" + this.current.dijkstraAddress + "/ui/t2/";
        },
        taskTypeIsRegular: function () {
            return this.current.taskType === "regular";
        },
        taskTypeIsProject: function () {
            return this.current.taskType === "project";
        },
        getDeadline: function () {
            var months = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
            return this.deadline.getDate() + " " + months[this.deadline.getMonth()] + " " + this.deadline.getFullYear();
        }, 
        validDijkstra: function () {
            var regex = /^[a-zA-Z.]+$/;
            return regex.test(this.current.dijkstraAddress);
        }
    },
    methods: {
        searchPrevious: function (id) {
            var studentCode = document.getElementById(id).value;
            for (var i = 1; i < this.works.length; i++) {
                var work = this.works[i];
                if (work.studentCodeOne === studentCode || work.studentCodeTwo === studentCode) {
                    this.currentIndex = this.getWorkIndex(work);
                } else {
                    this.currentIndex = 0;
                }
            }
        },
        getWorkIndex: function (work) {
            return this.works.indexOf(work);
        },
        checkStudentCode: function (id) {
            var studentCode = document.getElementById(id).value;
            if (id === 'studentCodeTwo' && studentCode === '') {
                return true;
            }
            return this.validStudentCode(studentCode);
        },
        validStudentCode: function (code) {
            var regex = /^\d{6}[a-zA-Z]{4}$/;
            return regex.test(code);
        },
        checkSubmitConditions: function () {
            if (this.canSubmit()) {
                $('#submissionMsg').hide();
                $('html, body').animate({scrollTop: 0});
                window.location.reload();
            } else {
                $('#submissionMsg').show();
                $('html, body').animate({scrollTop: 0}, 'fast');
            }
        },
        canSubmit: function () {
            if (this.current.taskType === 'regular') {
                return this.baseIsDone && this.validDijkstra && this.checkStudentCode('studentCodeOne') && this.checkStudentCode('studentCodeTwo');
            } else {
                return this.validDijkstra && this.checkStudentCode('studentCodeOne') && this.checkStudentCode('studentCodeTwo') && this.current.projectComment !== "";
            }
        }
    }
});

'use strict';

// function PhoneListCtrl($scope, Phone) {
//     $scope.phones = Phone.query()
//     $scope.orderProp = 'age';
// };

// function PhoneDetailCtrl($scope, $routeParams, Phone) {
//     Phone.get({
//         phoneId: $routeParams.phoneId
//     }, function(phone) {
//         $scope.phone = phone;
//         $scope.mainImageUrl = phone.images[0];
//     });
//     $scope.setMainImageSrc = function(imagePageUri) {
//         $scope.mainImageUrl = imagePageUri;
//     }
//     $scope.setImage = function(imageUrl) {
//         $scope.mainImageUrl = imageUrl;
//     }
// }

function FundCastListCtrl($scope, $http) {

    $http.get('fundCasts/fundCasts.json').success(function(data) {
        $scope.currentPage = parseInt(data.currentNo, 10) - 1;
        $scope.numPerPage = parseInt(data.totalRecorder, 10);
        $scope.fundCastList = setTotalFundCast(data).fundCastList.slice(0, $scope.numPerPage);
        $scope.mainFundCast = getTotalFundCast()[0];
        //brightcove.createExperiences();
    });

    $scope.next = function(currentPage) {
        var begin = currentPage * $scope.numPerPage,
            end = begin + $scope.numPerPage;
        $scope.currentPage = currentPage;
        $scope.fundCastList = $scope.totalFundCastList.slice(begin, end);
    };

    function setTotalFundCast(data) {
        $scope.totalFundCastList = data.fundCastList
        return data;
    }

    function getTotalFundCast() {
        return $scope.totalFundCastList;
    }

    function setMainFundCast(index) {
        var mainFundCast = getTotalFundCast()[index];
        BCL.change(mainFundCast.videoId);
        $scope.mainFundCast = mainFundCast;
    }

    $scope.changeMainFundCast = function(index) {
        setMainFundCast(index);

    }

    $scope.orderBy = 'videoDate';
}

// Brightcove Learning namespace
var BCL = {};
//template loaded event handler
BCL.onTemplateLoad = function(experienceID) {
    console.log("onTemplateLoad");
    // get references to the player and API Modules and Events
    BCL.player = brightcove.api.getExperience(experienceID);
    BCL.APIModules = BCL.player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
};

BCL.onTemplateReady = function(evt) {
    console.log("onTemplateReady");
    //BCL.videoPlayer = BCL.player.getModule(BCL.APIModules.VIDEO_PLAYER);
};

BCL.change = function(videoId) {
    BCL.APIModules.loadVideoByID(videoId);
};


var BCLS = (function() {
    var player,
        APIModules,
        adEvent,
        captionsEvent,
        contentEvent,
        cuePointEvent,
        mediaEvent,
        videoPlayer;
    return {
        /**** template loaded event handler ****/
        onTemplateLoad: function(experienceID) {
            // get a reference to the player and API Modules and Events
            player = brightcove.api.getExperience(experienceID);
            APIModules = brightcove.api.modules.APIModules;
            adEvent = brightcove.api.events.AdEvent;
            captionsEvent = brightcove.api.events.CaptionsEvent;
            contentEvent = brightcove.api.events.ContentEvent;
            cuePointEvent = brightcove.api.events.CuePointEvent;
            mediaEvent = brightcove.api.events.MediaEvent;
        }
    };
})()

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
/* Controllers */

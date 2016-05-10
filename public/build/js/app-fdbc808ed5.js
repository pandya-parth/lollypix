(function() {
  angular.module('mis', ['angularUtils.directives.dirPagination', 'ui.bootstrap', 'cgPrompt', 'angular-country-select']).config(function(paginationTemplateProvider) {
    return paginationTemplateProvider.setPath('/html/dirPagination.tpl.html');
  });

}).call(this);

(function() {
  angular.module('mis').config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{%');
    return $interpolateProvider.endSymbol('%}');
  });

}).call(this);

(function() {
  angular.module('mis').controller('BodyCtrl', function($scope) {
    return $scope.title = "MIS";
  });

}).call(this);

(function() {
  angular.module('mis').controller('companyCtrl', function($scope, company, $timeout, prompt) {
    var uploader;
    $scope.loading = true;
    $scope.currentPage = 1;
    $scope.edit = false;
    uploader = new plupload.Uploader({
      runtimes: 'html5,flash,silverlight,html4',
      browse_button: 'pickfiles',
      url: "../plupload/upload.php ",
      flash_swf_url: "../plupload/Moxie.swf ",
      silverlight_xap_url: "../plupload/Moxie.xap ",
      multi_selection: false,
      max_file_size: '1mb',
      init: {
        PostInit: function() {
          return angular.element('#filelist').innerHTML = '';
        },
        FilesAdded: function(up, files) {
          angular.forEach(files, function(file) {
            angular.element('#preview').html('<div id="fileadded" class="' + file.id + '"><div id="' + file.id + '"> <img src=tmp/' + file.name + ' class="img-thumbnail img-responsive img-circle" style="width:100px;height:100px;"> (' + plupload.formatSize(file.size) + ') <b></b><a href="javascript:;" id="' + file.id + '" class="removeFile" ng-click="shownoimage()">Remove</a></div></div>');
            return angular.element('a#' + file.id).on('click', function() {
              up.removeFile(file);
              angular.element('.' + file.id).hide();
            });
          });
          return uploader.start();
        },
        UploadProgress: function(up, file) {
          return $scope.company.logo = file.name;
        },
        Error: function(up, err) {
          return alert("Error #" + err.code + ": " + err.message);
        }
      }
    });
    uploader.init();
    angular.element('#addNewAppModal').on('shown.bs.modal', function() {
      return uploader.refresh();
    });
    company.get().success(function(data) {
      $scope.companies = data;
      return $scope.loading = false;
    });
    $scope.cancelAll = function() {
      angular.element('#addNewAppModal').modal('hide');
      $timeout((function() {
        $scope.submitted = false;
        $scope.edit = false;
        return $scope.people_array = {};
      }), 1000);
    };
    $scope.clearAll = function(form) {
      $scope.options = {
        title: 'You have changes.',
        message: 'Are you sure you want to discard changes?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      if (form.$dirty) {
        prompt($scope.options).then(function() {
          var myEl;
          angular.element('#addNewAppModal').modal('hide');
          $scope.submitted = false;
          $scope.edit = false;
          $scope.company = {};
          myEl = angular.element(document.querySelector('#fileadded'));
          myEl.remove();
          return angular.element('#preview').html("<img src='img/noIndustry.png'  style='height:100px;width:100px;'>");
        });
      } else {
        angular.element('#addNewAppModal').modal('hide');
        $timeout((function() {
          var myEl;
          $scope.submitted = false;
          $scope.edit = false;
          $scope.company = {};
          myEl = angular.element(document.querySelector('#fileadded'));
          myEl.remove();
          return angular.element('#preview').html("<img src='img/noIndustry.png'  style='height:100px;width:100px;'>");
        }), 1000);
      }
    };
    $scope.submit = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        return company.save($scope.company).success(function(data) {
          var myEl;
          $scope.submitted = false;
          $scope.company = {};
          myEl = angular.element(document.querySelector('#fileadded'));
          myEl.remove();
          angular.element('#preview').html("<img src='img/noPhoto.png'  style='height:100px;width:100px;'>");
          angular.element('#addNewAppModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
          return company.get().success(function(getData) {
            $scope.companies = getData;
            return $scope.loading = false;
          });
        });
      } else {
        return company.update($scope.company).success(function(data) {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.company = {};
          angular.element('#addNewAppModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 2000,
              type: 'success'
            }).show();
            return company.get().success(function(getData) {
              $scope.companies = getData;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.deleteCompany = function(id) {
      $scope.loading = true;
      return company.destroy(id).success(function(data) {
        company.get().success(function(getData) {
          $scope.companies = getData;
          return $scope.loading = false;
        });
        return angular.element('body').pgNotification({
          style: 'flip',
          message: 'Record deleted successfully.',
          position: 'top-right',
          timeout: 2000,
          type: 'success'
        }).show();
      });
    };
    return $scope.editCompany = function(id) {
      return company.edit(id).success(function(data) {
        $scope.edit = true;
        $scope.company = data;
        return angular.element('#addNewAppModal').modal('show');
      });
    };
  });

}).call(this);

(function() {
  angular.module('mis').controller('DepartmentCtrl', function($scope, Department, prompt, $timeout) {
    $scope.loading = true;
    $scope.currentPage = 1;
    $scope.edit = false;
    Department.get().success(function(data) {
      $scope.departments = data;
      return $scope.loading = false;
    });
    $scope.clearAll = function(form) {
      $scope.options = {
        title: 'You have changes.',
        message: 'Are you sure you want to discard changes?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      if (form.$dirty) {
        prompt($scope.options).then(function() {
          angular.element('#addNewAppModal').modal('hide');
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.department = {};
        });
      } else {
        angular.element('#addNewAppModal').modal('hide');
        $timeout((function() {
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.department = {};
        }), 1000);
      }
    };
    $scope.submit = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        return Department.save($scope.department).success(function(data) {
          $scope.submitted = false;
          $scope.department = {};
          angular.element('#addNewAppModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
          return Department.get().success(function(getData) {
            $scope.departments = getData;
            return $scope.loading = false;
          });
        });
      } else {
        return Department.update($scope.department).success(function(data) {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.department = {};
          angular.element('#addNewAppModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 2000,
              type: 'success'
            }).show();
            return Department.get().success(function(getData) {
              $scope.departments = getData;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.deleteDepartment = function(id) {
      $scope.loading = true;
      return Department.destroy(id).success(function(data) {
        Department.get().success(function(getData) {
          $scope.departments = getData;
          return $scope.loading = false;
        });
        return angular.element('body').pgNotification({
          style: 'flip',
          message: 'Record deleted successfully.',
          position: 'top-right',
          timeout: 2000,
          type: 'success'
        }).show();
      });
    };
    return $scope.editDepartment = function(id) {
      return Department.edit(id).success(function(data) {
        $scope.edit = true;
        $scope.department = {
          id: data.id,
          name: data.name
        };
        return angular.element('#addNewAppModal').modal('show');
      });
    };
  });

}).call(this);

(function() {
  angular.module('mis').controller('DesignationCtrl', function($scope, Designation, prompt, $timeout) {
    $scope.loading = true;
    $scope.currentPage = 1;
    $scope.edit = false;
    Designation.get().success(function(data) {
      $scope.designations = data;
      return $scope.loading = false;
    });
    $scope.clearAll = function(form) {
      $scope.options = {
        title: 'You have changes.',
        message: 'Are you sure you want to discard changes?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      if (form.$dirty) {
        prompt($scope.options).then(function() {
          angular.element('#addNewAppModal').modal('hide');
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.designation = {};
        });
      } else {
        angular.element('#addNewAppModal').modal('hide');
        $timeout((function() {
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.designation = {};
        }), 1000);
      }
    };
    $scope.submit = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        return Designation.save($scope.designation).success(function(data) {
          $scope.submitted = false;
          $scope.designation = {};
          angular.element('#addNewAppModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
          return Designation.get().success(function(getData) {
            $scope.designations = getData;
            return $scope.loading = false;
          });
        });
      } else {
        return Designation.update($scope.designation).success(function(data) {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.designation = {};
          angular.element('#addNewAppModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 2000,
              type: 'success'
            }).show();
            return Designation.get().success(function(getData) {
              $scope.designations = getData;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.deleteDesignation = function(id) {
      $scope.loading = true;
      return Designation.destroy(id).success(function(data) {
        Designation.get().success(function(getData) {
          $scope.designations = getData;
          return $scope.loading = false;
        });
        return angular.element('body').pgNotification({
          style: 'flip',
          message: 'Record deleted successfully.',
          position: 'top-right',
          timeout: 2000,
          type: 'success'
        }).show();
      });
    };
    return $scope.editDesignation = function(id) {
      return Designation.edit(id).success(function(data) {
        $scope.edit = true;
        $scope.designation = {
          id: data.id,
          name: data.name
        };
        return angular.element('#addNewAppModal').modal('show');
      });
    };
  });

}).call(this);

(function() {
  angular.module('mis').controller('IndustryCtrl', function($scope, Industry, prompt, $timeout) {
    $scope.loading = true;
    $scope.currentPage = 1;
    $scope.edit = false;
    Industry.get().success(function(data) {
      $scope.industries = data;
      return $scope.loading = false;
    });
    $scope.clearAll = function(form) {
      $scope.options = {
        title: 'You have changes.',
        message: 'Are you sure you want to discard changes?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      if (form.$dirty) {
        prompt($scope.options).then(function() {
          angular.element('#addNewAppModal').modal('hide');
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.industry = {};
        });
      } else {
        angular.element('#addNewAppModal').modal('hide');
        $timeout((function() {
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.industry = {};
        }), 1000);
      }
    };
    $scope.submit = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        return Industry.save($scope.industry).success(function(data) {
          $scope.submitted = false;
          $scope.industry = {};
          angular.element('#addNewAppModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
          return Industry.get().success(function(getData) {
            $scope.industries = getData;
            return $scope.loading = false;
          });
        });
      } else {
        return Industry.update($scope.industry).success(function(data) {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.industry = {};
          angular.element('#addNewAppModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 2000,
              type: 'success'
            }).show();
            return Industry.get().success(function(getData) {
              $scope.industries = getData;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.deleteIndustry = function(id) {
      $scope.loading = true;
      return Industry.destroy(id).success(function(data) {
        Industry.get().success(function(getData) {
          $scope.industries = getData;
          return $scope.loading = false;
        });
        return angular.element('body').pgNotification({
          style: 'flip',
          message: 'Record deleted successfully.',
          position: 'top-right',
          timeout: 2000,
          type: 'success'
        }).show();
      });
    };
    return $scope.editIndustry = function(id) {
      return Industry.edit(id).success(function(data) {
        $scope.edit = true;
        $scope.industry = {
          id: data.id,
          name: data.name
        };
        return angular.element('#addNewAppModal').modal('show');
      });
    };
  });

}).call(this);

(function() {
  angular.module('mis').controller('milestoneCtrl', function($scope, milestone, $timeout, $window) {
    var currentUrl, pId;
    $scope.loading = true;
    $scope.currentPage = 1;
    $scope.edit = false;
    currentUrl = $window.location.href;
    pId = currentUrl.split('/')[4] || "Undefined";
    milestone.get(pId).success(function(data) {
      $scope.milestones = data;
      return $scope.loading = false;
    });
    $scope.Pro_Id = pId;
    $scope.clearAll = function() {
      angular.element('#addNewAppModal').modal('hide');
      $timeout((function() {
        $scope.submitted = false;
        $scope.edit = false;
        return $scope.milestone = {};
      }), 1000);
    };
    $scope.submit = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        $scope.milestone.project_id = pId;
        return milestone.save($scope.milestone).success(function(data) {
          $scope.submitted = false;
          $scope.milestone = {};
          angular.element('#addNewAppModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
          return milestone.get(pId).success(function(getData) {
            $scope.milestones = getData;
            return $scope.loading = false;
          });
        });
      } else {
        return milestone.update($scope.milestone).success(function(data) {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.milestone = {};
          angular.element('#addNewAppModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 2000,
              type: 'success'
            }).show();
            return milestone.get(pId).success(function(getData) {
              $scope.milestones = getData;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.deleteMilestone = function(id) {
      $scope.loading = true;
      return milestone.destroy(id).success(function(data) {
        milestone.get(pId).success(function(getData) {
          $scope.milestones = getData;
          return $scope.loading = false;
        });
        return angular.element('body').pgNotification({
          style: 'flip',
          message: 'Record deleted successfully.',
          position: 'top-right',
          timeout: 2000,
          type: 'success'
        }).show();
      });
    };
    return $scope.editMilestone = function(id) {
      return milestone.edit(id).success(function(data) {
        $scope.edit = true;
        $scope.milestone = data;
        return angular.element('#addNewAppModal').modal('show');
      });
    };
  });

}).call(this);

(function() {
  angular.module('mis').controller('PeopleCtrl', function($scope, PEOPLE, $timeout, prompt, $window) {
    var currentUrl, pId, uploader;
    $scope.loading = true;
    $scope.currentPage = 1;
    $scope.edit = false;
    currentUrl = $window.location.href;
    pId = currentUrl.split('/')[4] || "Undefined";
    $scope.Pro_Id = pId;
    $scope.educations = [
      {
        qualification: '',
        collage: '',
        university: '',
        passing_year: '',
        percentage: ''
      }
    ];
    $scope.experiences = [
      {
        company_name: '',
        from: '',
        to: '',
        salary: '',
        reason: ''
      }
    ];
    $scope.newItem = function($event) {
      $scope.educations.push({
        qualification: '',
        collage: '',
        university: '',
        passing_year: '',
        percentage: ''
      });
      return $event.preventDefault();
    };
    $scope.nextItem = function($event) {
      $scope.experiences.push({
        company_name: '',
        from: '',
        to: '',
        salary: '',
        reason: ''
      });
      return $event.preventDefault();
    };
    uploader = new plupload.Uploader({
      runtimes: 'html5,flash,silverlight,html4',
      browse_button: 'pickfiles',
      url: "../plupload/upload.php ",
      flash_swf_url: "../plupload/Moxie.swf ",
      silverlight_xap_url: "../plupload/Moxie.xap ",
      multi_selection: false,
      init: {
        PostInit: function() {
          return angular.element('#filelist').innerHTML = '';
        },
        FilesAdded: function(up, files) {
          angular.forEach(files, function(file) {
            angular.element('#preview').html('<div id="fileadded" class="' + file.id + '"><div id="' + file.id + '"> <img src=tmp/' + file.name + ' class="img-thumbnail img-responsive img-circle" style="width:100px;height:100px;"> (' + plupload.formatSize(file.size) + ') <b></b><a href="javascript:;" id="' + file.id + '" class="removeFile" ng-click="shownoimage()" >Remove</a></div></div>');
            return angular.element('a#' + file.id).on('click', function() {
              up.removeFile(file);
              angular.element('.' + file.id).hide();
            });
          });
          return uploader.start();
        },
        UploadProgress: function(up, file) {
          return $scope.people_array.photo = file.name;
        },
        Error: function(up, err) {
          return alert("Error #" + err.code + ": " + err.message);
        }
      }
    });
    uploader.init();
    angular.element('#addNewAppModal').on('shown.bs.modal', function() {
      return uploader.refresh();
    });
    PEOPLE.get(pId).success(function(data) {
      $scope.peoples = data;
      return $scope.loading = false;
    });
    $scope.cancelAll = function() {
      angular.element('#addNewAppModal').modal('hide');
      $timeout((function() {
        $scope.submitted = false;
        $scope.edit = false;
        return $scope.people_array = {};
      }), 1000);
    };
    $scope.clearAll = function(form) {
      $scope.options = {
        title: 'You have changes.',
        message: 'Are you sure you want to discard changes?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      if (form.$dirty) {
        prompt($scope.options).then(function() {
          var myEl;
          angular.element('#addNewAppModal').modal('hide');
          $scope.submitted = false;
          $scope.edit = false;
          $scope.people_array = {};
          myEl = angular.element(document.querySelector('#fileadded'));
          myEl.remove();
          return angular.element('#preview').html("<img src='img/noPhoto.png'  style='height:100px;width:100px;'>");
        });
      } else {
        angular.element('#addNewAppModal').modal('hide');
        $scope.educations = [
          {
            qualification: '',
            collage: '',
            university: '',
            passing_year: '',
            percentage: ''
          }
        ];
        $scope.experiences = [
          {
            company_name: '',
            from: '',
            to: '',
            salary: '',
            reason: ''
          }
        ];
        $timeout((function() {
          var myEl;
          $scope.submitted = false;
          $scope.edit = false;
          $scope.people_array = {};
          myEl = angular.element(document.querySelector('#fileadded'));
          myEl.remove();
          return angular.element('#preview').html("<img src='img/noPhoto.png'  style='height:100px;width:100px;'>");
        }), 1000);
      }
    };
    $scope.submit = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        return PEOPLE.save($scope.people_array).success(function(data) {
          var myEl;
          $scope.submitted = false;
          $scope.people_array = {};
          myEl = angular.element(document.querySelector('#fileadded'));
          myEl.remove();
          angular.element('#preview').html("<img src='img/noPhoto.png'  style='height:100px;width:100px;'>");
          angular.element('#addNewAppModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
          return PEOPLE.get(pId).success(function(getData) {
            $scope.peoples = getData;
            return $scope.loading = false;
          });
        });
      } else {
        return PEOPLE.update($scope.people_array).success(function(data) {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.people_array = {};
          angular.element('#addNewAppModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 2000,
              type: 'success'
            }).show();
            return PEOPLE.get(pId).success(function(getData) {
              $scope.peoples = getData;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.submitPeople = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        return PEOPLE.addPeople($scope.project_people).success(function(data) {
          $scope.submitted = false;
          $scope.project_people = {};
          angular.element('#addNewAppModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
          return PEOPLE.getProjectPeople(pId).success(function(getData) {
            $scope.project_peoples = getData;
            return $scope.loading = false;
          });
        });
      } else {
        return PEOPLE.updatePeople($scope.project_people).success(function(data) {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.project_people = {};
          angular.element('#addNewAppModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 2000,
              type: 'success'
            }).show();
            return PEOPLE.getProjectPeople(pId).success(function(getData) {
              $scope.project_peoples = getData;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.deletePeople = function(id) {
      $scope.loading = true;
      return PEOPLE.destroy(id).success(function(data) {
        PEOPLE.get().success(function(getData) {
          $scope.peoples = getData;
          return $scope.loading = false;
        });
        return angular.element('body').pgNotification({
          style: 'flip',
          message: 'Record deleted successfully.',
          position: 'top-right',
          timeout: 2000,
          type: 'success'
        }).show();
      });
    };
    $scope.editPeople = function(id) {
      return PEOPLE.edit(id).success(function(data) {
        $scope.edit = true;
        $scope.people_array = data[0];
        $scope.people_array.email = data[1];
        $scope.educations = data[2];
        $scope.experiences = data[3];
        return angular.element('#addNewAppModal').modal('show');
      });
    };
    $scope.removeEducationClone = function(education) {
      var index;
      index = $scope.educations.indexOf(education);
      $scope.educations.splice(index, 1);
      return $scope.people_array.education = $scope.educations;
    };
    $scope.removeEducation = function(education) {
      $scope.options = {
        title: 'Remove Education',
        message: 'Are you sure you want to delete this education detail?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      return prompt($scope.options).then(function() {
        return PEOPLE.destroyEducation(education.id).success(function(data) {
          var index;
          index = $scope.educations.indexOf(education);
          $scope.educations.splice(index, 1);
          $scope.people_array.education = $scope.educations;
          return angular.element('body').pgNotification({
            style: 'flip',
            message: 'Education deleted successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
        });
      });
    };
    $scope.removeExperience = function(experience) {
      $scope.options = {
        title: 'Remove Experience',
        message: 'Are you sure you want to delete this experience detail?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      return prompt($scope.options).then(function() {
        return PEOPLE.destroyExperience(experience.id).success(function(data) {
          var index;
          index = $scope.experiences.indexOf(experience);
          $scope.experiences.splice(index, 1);
          $scope.people_array.experience = $scope.educations;
          return angular.element('body').pgNotification({
            style: 'flip',
            message: 'Experience deleted successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
        });
      });
    };
    return $scope.removeExperienceClone = function(experience) {
      var index;
      index = $scope.experiences.indexOf(experience);
      $scope.experiences.splice(index, 1);
      return $scope.people_array.experience = $scope.experiences;
    };
  });

}).call(this);

(function() {
  angular.module('mis').controller('ProjectCategoryCtrl', function($scope, projectCategory, prompt, $timeout) {
    $scope.loading = true;
    $scope.currentPage = 1;
    $scope.edit = false;
    projectCategory.get().success(function(data) {
      $scope.categories = data;
      return $scope.loading = false;
    });
    $scope.clearAll = function(form) {
      $scope.options = {
        title: 'You have changes.',
        message: 'Are you sure you want to discard changes?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      if (form.$dirty) {
        prompt($scope.options).then(function() {
          angular.element('#addNewAppModal').modal('hide');
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.project_category = {};
        });
      } else {
        angular.element('#addNewAppModal').modal('hide');
        $timeout((function() {
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.project_category = {};
        }), 1000);
      }
    };
    $scope.submit = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        return projectCategory.save($scope.project_category).success(function(data) {
          $scope.submitted = false;
          $scope.project_category = {};
          angular.element('#addNewAppModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
          return projectCategory.get().success(function(getData) {
            $scope.categories = getData;
            return $scope.loading = false;
          });
        });
      } else {
        return projectCategory.update($scope.project_category).success(function(data) {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.project_category = {};
          angular.element('#addNewAppModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 2000,
              type: 'success'
            }).show();
            return projectCategory.get().success(function(getData) {
              $scope.categories = getData;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.deleteCategory = function(id) {
      $scope.loading = true;
      return projectCategory.destroy(id).success(function(data) {
        projectCategory.get().success(function(getData) {
          $scope.categories = getData;
          return $scope.loading = false;
        });
        return angular.element('body').pgNotification({
          style: 'flip',
          message: 'Record deleted successfully.',
          position: 'top-right',
          timeout: 2000,
          type: 'success'
        }).show();
      });
    };
    return $scope.editCategory = function(id) {
      return projectCategory.edit(id).success(function(data) {
        $scope.edit = true;
        $scope.project_category = {
          id: data.id,
          name: data.name
        };
        return angular.element('#addNewAppModal').modal('show');
      });
    };
  });

}).call(this);

(function() {
  angular.module('mis').controller('ProjectCtrl', function($scope, PROJECT, $timeout, prompt, $window) {
    var currentUrl, pId;
    $scope.loading = true;
    $scope.currentPage = 1;
    $scope.edit = false;
    currentUrl = $window.location.href;
    pId = currentUrl.split('/')[4] || "Undefined";
    $scope.Pro_Id = pId;
    PROJECT.get().success(function(data) {
      $scope.projects = data;
      return $scope.loading = false;
    });
    PROJECT.getCompany().success(function(data) {
      $scope.companies = data;
      return $scope.loading = false;
    });
    $scope.cancelAll = function() {
      angular.element('#addNewAppModal').modal('hide');
      $timeout((function() {
        $scope.submitted = false;
        $scope.edit = false;
        return $scope.project_array = {};
      }), 1000);
    };
    $scope.clearAll = function(form) {
      $scope.options = {
        title: 'You have changes.',
        message: 'Are you sure you want to discard changes?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      if (form.$dirty) {
        prompt($scope.options).then(function() {
          angular.element('#addNewAppModal').modal('hide');
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.project_array = {};
        });
      } else {
        angular.element('#addNewAppModal').modal('hide');
        $timeout((function() {
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.project_array = {};
        }), 1000);
      }
    };
    $scope.submit = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        return PROJECT.save($scope.project_array).success(function(data) {
          $scope.submitted = false;
          $scope.project_array = {};
          angular.element('#addNewAppModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
          return PROJECT.get().success(function(getData) {
            $scope.projects = getData;
            return $scope.loading = false;
          });
        });
      } else {
        return PROJECT.update($scope.project_array).success(function(data) {
          console.log(data);
          $scope.submitted = false;
          $scope.edit = false;
          $scope.project_array = {};
          angular.element('#addNewAppModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 2000,
              type: 'success'
            }).show();
            return PROJECT.get().success(function(getData) {
              $scope.projects = getData;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.deleteProject = function(id) {
      $scope.loading = true;
      return PROJECT.destroy(id).success(function(data) {
        PROJECT.get().success(function(getData) {
          $scope.projects = getData;
          return $scope.loading = false;
        });
        return angular.element('body').pgNotification({
          style: 'flip',
          message: 'Record deleted successfully.',
          position: 'top-right',
          timeout: 2000,
          type: 'success'
        }).show();
      });
    };
    return $scope.editProject = function(id) {
      return PROJECT.edit(id).success(function(data) {
        $scope.edit = true;
        $scope.project_array = data;
        return angular.element('#addNewAppModal').modal('show');
      });
    };
  });

}).call(this);

(function() {
  angular.module('mis').controller('TaskCategoryCtrl', function($scope, taskCategory, $timeout, prompt) {
    $scope.loading = true;
    $scope.currentPage = 1;
    $scope.edit = false;
    taskCategory.get().success(function(data) {
      $scope.task_categories = data;
      return $scope.loading = false;
    });
    taskCategory.getTask().success(function(data) {
      $scope.tasks = data;
      return $scope.loading = false;
    });
    $scope.cancelAll = function() {
      angular.element('#addNewAppModal').modal('hide');
      $timeout((function() {
        $scope.submitted = false;
        $scope.edit = false;
        return $scope.task_category = {};
      }), 1000);
    };
    $scope.clearAll = function(form) {
      $scope.options = {
        title: 'You have changes.',
        message: 'Are you sure you want to discard changes?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      if (form.$dirty) {
        prompt($scope.options).then(function() {
          angular.element('#addNewAppModal').modal('hide');
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.task_category = {};
        });
      } else {
        angular.element('#addNewAppModal').modal('hide');
        $timeout((function() {
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.task_category = {};
        }), 1000);
      }
    };
    $scope.submit = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        return taskCategory.save($scope.task_category).success(function(data) {
          $scope.submitted = false;
          $scope.task_category = {};
          angular.element('#addNewAppModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 25000,
            type: 'success'
          }).show();
          return taskCategory.get().success(function(getData) {
            $scope.task_categories = getData;
            return $scope.loading = false;
          });
        });
      } else {
        return taskCategory.update($scope.task_category).success(function(data) {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.task_category = {};
          angular.element('#addNewAppModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 10000,
              type: 'success'
            }).show();
            return taskCategory.get().success(function(getData) {
              $scope.task_categories = getData;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.deleteCategory = function(id) {
      $scope.loading = true;
      return taskCategory.destroy(id).success(function(data) {
        return taskCategory.get().success(function(getData) {
          $scope.task_categories = getData;
          $scope.loading = false;
          return angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record deleted successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
        });
      });
    };
    return $scope.editCategory = function(id) {
      return taskCategory.edit(id).success(function(data) {
        $scope.edit = true;
        $scope.task_category = {
          id: data.id,
          name: data.name
        };
        return angular.element('#addNewAppModal').modal('show');
      });
    };
  });

}).call(this);

(function() {
  angular.module('mis').controller('TasksCtrl', function($scope, task, $timeout, $window, prompt) {
    var currentUrl, pId, tId;
    $scope.loading = true;
    $scope.currentPage = 1;
    $scope.edit = false;
    currentUrl = $window.location.href;
    pId = currentUrl.split('/')[4] || "Undefined";
    tId = currentUrl.split('/')[6] || "Undefined";
    task.get(pId).success(function(data) {
      $scope.tasks = data;
      return $scope.loading = false;
    });
    task.show(tId).success(function(data) {
      $scope.logs = data;
      return $scope.loading = false;
    });
    task.getCat().success(function(data) {
      $scope.taskcategories = data;
      return $scope.loading = false;
    });
    $scope.Pro_Id = pId;
    $scope.showModal = function(event) {
      $scope.task.category_id = event.target.id;
      angular.element('#addNewAppModal').modal('show');
    };
    $scope.showLogModal = function(event, id) {
      $scope.task_id = id;
      angular.element('#logTimeModal').modal('show');
    };
    $scope.cancelAll = function() {
      angular.element('#addNewAppModal').modal('hide');
      $timeout((function() {
        $scope.submitted = false;
        $scope.edit = false;
        return $scope.task = {};
      }), 1000);
    };
    $scope.clearAll = function(form) {
      $scope.options = {
        title: 'You have changes.',
        message: 'Are you sure you want to discard changes?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      if (form.$dirty) {
        prompt($scope.options).then(function() {
          angular.element('#addNewAppModal').modal('hide');
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.task = {};
        });
      } else {
        angular.element('#addNewAppModal').modal('hide');
        $timeout((function() {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.task = {};
          return $scope.task.priority = "low";
        }), 1000);
      }
    };
    $scope.logCancel = function() {
      angular.element('#logTimeModal').modal('hide');
      $timeout((function() {
        $scope.submitted = false;
        $scope.edit = false;
        return $scope.logtime = {};
      }), 1000);
    };
    $scope.logClearAll = function(form) {
      $scope.options = {
        title: 'You have changes.',
        message: 'Are you sure you want to discard changes?',
        input: false,
        label: '',
        value: '',
        values: false,
        buttons: [
          {
            label: 'ok',
            primary: true
          }, {
            label: 'Cancel',
            cancel: true
          }
        ]
      };
      if (form.$dirty) {
        prompt($scope.options).then(function() {
          angular.element('#logTimeModal').modal('hide');
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.logtime = {};
        });
      } else {
        angular.element('#logTimeModal').modal('hide');
        $timeout((function() {
          $scope.submitted = false;
          $scope.edit = false;
          return $scope.logtime = {};
        }), 1000);
      }
    };
    $scope.submit = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        $scope.task.project_id = pId;
        return task.save($scope.task).success(function(data) {
          $scope.submitted = false;
          $scope.task = {};
          angular.element('#addNewAppModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
          return task.get(pId).success(function(getData) {
            $scope.tasks = getData;
            return $scope.loading = false;
          });
        });
      } else {
        return task.update($scope.task).success(function(data) {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.task = {};
          angular.element('#addNewAppModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 2000,
              type: 'success'
            }).show();
            return task.get(pId).success(function(getData) {
              $scope.tasks = getData;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.toggleStatus = function() {
      return task.update($scope.task.status).success(function(data) {
        alert($scope.task.status);
        return task.get(pId).success(function(getData) {
          return $scope.tasks = getData;
        });
      });
    };
    $scope.submitLog = function(form) {
      $scope.loading = true;
      $scope.submitted = true;
      if (form.$invalid) {
        $scope.loading = false;
        return;
      } else {
        $scope.loading = true;
      }
      if ($scope.edit === false) {
        $scope.logtime.task_id = $scope.task_id;
        return task.savelog($scope.logtime).success(function(data) {
          $scope.submitted = false;
          $scope.logtime = {};
          angular.element('#logTimeModal').modal('hide');
          angular.element('body').pgNotification({
            style: 'flip',
            message: 'Record saved successfully.',
            position: 'top-right',
            timeout: 2000,
            type: 'success'
          }).show();
          return task.show(tId).success(function(data) {
            $scope.logs = data;
            return $scope.loading = false;
          });
        });
      } else {
        return task.updatelog($scope.logtime).success(function(data) {
          $scope.submitted = false;
          $scope.edit = false;
          $scope.logtime = {};
          angular.element('#logTimeModal').modal('hide');
          return $timeout((function() {
            angular.element('body').pgNotification({
              style: 'flip',
              message: 'Record updated successfully.',
              position: 'top-right',
              timeout: 2000,
              type: 'success'
            }).show();
            return task.show(tId).success(function(data) {
              $scope.logs = data;
              return $scope.loading = false;
            });
          }), 500);
        });
      }
    };
    $scope.deleteTask = function(id) {
      $scope.loading = true;
      return task.destroy(id).success(function(data) {
        task.get(pId).success(function(getData) {
          $scope.tasks = getData;
          return $scope.loading = false;
        });
        return angular.element('body').pgNotification({
          style: 'flip',
          message: 'Record deleted successfully.',
          position: 'top-right',
          timeout: 2000,
          type: 'success'
        }).show();
      });
    };
    $scope.editTask = function(id) {
      return task.edit(id).success(function(data) {
        $scope.edit = true;
        $scope.task = data;
        return angular.element('#addNewAppModal').modal('show');
      });
    };
    $scope.deleteLog = function(lid) {
      $scope.loading = true;
      return task.destroylog(lid).success(function(data) {
        task.show(tId).success(function(getData) {
          $scope.logs = getData;
          return $scope.loading = false;
        });
        return angular.element('body').pgNotification({
          style: 'flip',
          message: 'Record deleted successfully.',
          position: 'top-right',
          timeout: 2000,
          type: 'success'
        }).show();
      });
    };
    return $scope.editLog = function(id) {
      $scope.task_id = id;
      angular.element('#logTimeModal').modal('show');
      return task.editlog(id).success(function(data) {
        $scope.edit = true;
        $scope.logtime = data;
        return angular.element('#addNewAppModal').modal('show');
      });
    };
  });

}).call(this);

(function() {
  angular.module('mis').factory('company', function($http) {
    return {
      get: function() {
        return $http.get('/api/companies');
      },
      save: function(formData) {
        return $http({
          method: 'POST',
          url: '/companies',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      edit: function(id) {
        return $http.get('/api/company/' + id);
      },
      update: function(formData) {
        return $http({
          method: 'PUT',
          url: '/companies/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      destroy: function(id) {
        return $http["delete"]('/companies/' + id);
      }
    };
  });

}).call(this);

(function() {
  angular.module('mis').factory('Department', function($http) {
    return {
      get: function() {
        return $http.get('/api/departments');
      },
      save: function(formData) {
        return $http({
          method: 'POST',
          url: '/departments',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      edit: function(id) {
        return $http.get('/api/department/' + id);
      },
      update: function(formData) {
        return $http({
          method: 'PUT',
          url: '/departments/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      destroy: function(id) {
        return $http["delete"]('/departments/' + id);
      }
    };
  });

}).call(this);

(function() {
  angular.module('mis').factory('Designation', function($http) {
    return {
      get: function() {
        return $http.get('/api/designations');
      },
      save: function(formData) {
        return $http({
          method: 'POST',
          url: '/designations',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      edit: function(id) {
        return $http.get('/api/designation/' + id);
      },
      update: function(formData) {
        return $http({
          method: 'PUT',
          url: '/designations/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      destroy: function(id) {
        return $http["delete"]('/designations/' + id);
      }
    };
  });

}).call(this);

(function() {
  angular.module('mis').factory('Industry', function($http) {
    return {
      get: function() {
        return $http.get('/api/industries');
      },
      save: function(formData) {
        return $http({
          method: 'POST',
          url: '/industries',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      edit: function(id) {
        return $http.get('/api/industry/' + id);
      },
      update: function(formData) {
        return $http({
          method: 'PUT',
          url: '/industries/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      destroy: function(id) {
        return $http["delete"]('/industries/' + id);
      }
    };
  });

}).call(this);

(function() {
  angular.module('mis').factory('milestone', function($http) {
    return {
      get: function(pId) {
        return $http.get('/api/milestones', {
          params: {
            project_id: pId
          }
        });
      },
      save: function(formData) {
        return $http({
          method: 'POST',
          url: '/projects/' + formData.id + '/milestones',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      edit: function(id, pId) {
        return $http.get('/api/milestone/' + id, {
          params: {
            project_id: pId
          }
        });
      },
      update: function(formData, id) {
        return $http({
          method: 'PUT',
          url: '/projects/' + formData.project_id + '/milestones/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      destroy: function(pId, id) {
        return $http["delete"]('/projects/' + pId + '/milestones/' + id);
      }
    };
  });

}).call(this);

(function() {
  angular.module('mis').factory('PEOPLE', function($http) {
    return {
      get: function() {
        return $http.get('/api/people');
      },
      getPeople: function(formData) {
        return $http.get('/project/' + formData.id + '/people');
      },
      save: function(formData) {
        return $http({
          method: 'POST',
          url: '/people',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      addPeople: function(formData, pId) {
        return $http({
          method: 'POST',
          url: '/project/' + pId + '/people',
          params: {
            project_id: pId
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      edit: function(id) {
        return $http.get('/api/people/' + id);
      },
      update: function(formData) {
        return $http({
          method: 'PUT',
          url: '/people/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      updatePeople: function(formData, id) {
        return $http({
          method: 'PUT',
          url: '/project/' + formData.id + '/people/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      destroy: function(id) {
        return $http["delete"]('/people/' + id);
      },
      destroyEducation: function(id) {
        return $http["delete"]('/education/' + id);
      },
      destroyExperience: function(id) {
        return $http["delete"]('/experience/' + id);
      }
    };
  });

}).call(this);

(function() {
  angular.module('mis').factory('projectCategory', function($http) {
    return {
      get: function() {
        return $http.get('/api/project-categories');
      },
      save: function(formData) {
        return $http({
          method: 'POST',
          url: '/project-categories',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      edit: function(id) {
        return $http.get('/api/project-category/' + id);
      },
      update: function(formData) {
        return $http({
          method: 'PUT',
          url: '/project-categories/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      destroy: function(id) {
        return $http["delete"]('/project-categories/' + id);
      }
    };
  });

}).call(this);

(function() {
  angular.module('mis').factory('PROJECT', function($http) {
    return {
      get: function() {
        return $http.get('/api/projects');
      },
      getCompany: function() {
        return $http.get('/api/companies');
      },
      save: function(formData) {
        return $http({
          method: 'POST',
          url: '/projects',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      edit: function(id) {
        return $http.get('/api/projects/' + id);
      },
      update: function(formData) {
        return $http({
          method: 'PUT',
          url: '/projects/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      destroy: function(id) {
        return $http["delete"]('/projects/' + id);
      }
    };
  });

}).call(this);

(function() {
  angular.module('mis').factory('taskCategory', function($http) {
    return {
      get: function() {
        return $http.get('/api/task-categories');
      },
      getTask: function() {
        return $http.get('/api/tasks');
      },
      save: function(formData) {
        return $http({
          method: 'POST',
          url: '/task-categories',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      edit: function(id) {
        return $http.get('/api/task-category/' + id);
      },
      update: function(formData) {
        return $http({
          method: 'PUT',
          url: '/task-categories/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      destroy: function(id) {
        return $http["delete"]('/task-categories/' + id);
      }
    };
  });

}).call(this);

(function() {
  angular.module('mis').factory('task', function($http) {
    return {
      get: function(pId) {
        return $http.get('/api/tasks', {
          params: {
            project_id: pId
          }
        });
      },
      getCat: function() {
        return $http.get('/api/task-categories');
      },
      save: function(formData) {
        return $http({
          method: 'POST',
          url: '/projects/' + formData.id + '/tasks',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      show: function(tId) {
        return $http.get('/api/logtimes', {
          params: {
            task_id: tId
          }
        });
      },
      savelog: function(formData) {
        return $http({
          method: 'POST',
          url: '/logtimes',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      edit: function(id, pId) {
        return $http.get('/api/task/' + id, {
          params: {
            project_id: pId
          }
        });
      },
      editlog: function(id) {
        return $http.get('/api/logtime/' + id);
      },
      update: function(formData, id) {
        return $http({
          method: 'PUT',
          url: '/projects/' + formData.project_id + '/tasks/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      updatelog: function(formData, id) {
        return $http({
          method: 'PUT',
          url: '/logtimes/' + formData.id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param(formData)
        });
      },
      destroy: function(pId, id) {
        return $http["delete"]('/projects/' + pId + '/tasks/' + id);
      },
      destroylog: function(id) {
        return $http["delete"]('/logtimes/' + id);
      }
    };
  });

}).call(this);

//# sourceMappingURL=app.js.map

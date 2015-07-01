module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('bootstrap-sass', '^3.3.5');
  }
};

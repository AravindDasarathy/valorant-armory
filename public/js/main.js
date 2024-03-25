$(document).ready(function () {
  $('#viewWeaponsButton').click(function () {
    window.location.href = '/weapons';
  });

  $('.weapon-card').click(function () {
    const weaponName = $(this).data('weapon-name');

    window.location.href = `/skins?weapon_name=${weaponName}`;
  });
});

$(document).ready(function () {
  $('#viewWeaponsButton').click(function () {
    window.location.href = '/weapons';
  });

  $('.weapon-card').click(function () {
    const weaponName = $(this).data('weapon-name');

    window.location.href = `/skins?weapon_name=${weaponName}`;
  });

  $('.view-variants-btn').click(function () {
    const skinId = $(this).data('skin-id');
    $.ajax({
      url: `http://localhost:8080/skins/${skinId}`,
      success: function (skinDetails) {
        populateVariantsModal(skinDetails);
        $('#variantsModal').modal('show');
      },
      error: function () {
        alert('Failed to fetch skin details');
      },
    });
  });

  $('.close-modal-button').click(function () {
    $('#variantsModal').modal('hide');
  });

  $('#variantsModal').on('hide.bs.modal', function () {
    $('video', this).each(function () {
      this.pause();
    });
  });
});

function populateVariantsModal(skin) {
  let modalContent = `
  <div class="view-box text-center mb-3">
      <img src="${skin.displayIcon}" class="img-fluid" alt="${skin.displayName}">
  </div>
  <div class="d-flex justify-content-center mb-3">`;

  // Populate swatches
  skin.chromas.forEach((chroma) => {
    modalContent += `
      <img src="${chroma.swatch}" alt="${chroma.displayName}" class="img-thumbnail mx-1" style="width: 50px; cursor: pointer;" onclick="updateViewBoxWithFullRender('${chroma.fullRender}')">`;
  });

  modalContent += `</div><div class="d-flex flex-column align-items-center">`;

  // Populate levels
  skin.levels.forEach((level, index) => {
    modalContent += `
      <button class="btn btn-primary my-1 level-button"
        onclick="playLevelVideo('${level.streamedVideo}', '${level.displayName}')">
        Level ${index + 1}
      </button>`;
  });

  adjustLevelButtonsWidth();

  modalContent += `</div>`;
  $('#variantsModal .modal-body').html(modalContent);
}

function updateViewBoxWithFullRender(fullRenderUrl) {
  $('.view-box').html(`<img src="${fullRenderUrl}" class="img-fluid" alt="Skin Variant">`);
}

function playLevelVideo(videoUrl, displayName) {
  if (videoUrl) {
    $('.view-box').html(`
      <video controls autoplay class="img-fluid">
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="mt-2">${displayName}</div>
    `);
  } else {
    alert('Video not available for this level.');
  }
}

function adjustLevelButtonsWidth() {
  const swatchTotalWidth = $('.chroma-item').length * (30 + 10);
  $('.level-button').css('width', swatchTotalWidth + 'px');
}

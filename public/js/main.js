$(document).ready(function() {
  $('#searchForm').on('submit', handleSearchFormSubmission);
  $('.view-variants-btn').click(fetchAndRenderSkinVariants);
  $('.close-modal-button').click(hideVariantsModal);
  $('#variantsModal').on('hide.bs.modal', pauseVideosInModal);
});

function handleSearchFormSubmission(event) {
  event.preventDefault();

  const baseUrl = $(this).attr('action').split('?')[0];
  const existingParams = new URLSearchParams(window.location.search);
  const searchKey = $('input[name="key"]').val();

  existingParams.set('key', searchKey);

  const newAction = `${baseUrl}?${existingParams.toString()}`;

  window.location.href = newAction;
}

function fetchAndRenderSkinVariants() {
  const skinId = $(this).data('skin-id');
  $.ajax({
    url: `/skins/${skinId}`,
    success: function (skinDetails) {
      populateVariantsModal(skinDetails);
      $('#variantsModal').modal('show');
    },
    error: function () {
      alert('Failed to fetch skin details');
    },
  });
}

function hideVariantsModal() {
  $('#variantsModal').modal('hide');
}

function pauseVideosInModal() {
  $('video', this).each(function () {
    this.pause();
  });
}

function populateVariantsModal(skin) {
  let modalContent = `
    <div class="view-box text-center mb-3">
        <img src="${skin.displayIcon}" class="img-fluid" alt="${skin.displayName}" id="mainSkinImage">
    </div>
    <div class="d-flex justify-content-center mb-3" id="swatchesContainer">`;

  // Populate swatches
    skin.chromas.forEach((chroma, index) => {
    modalContent += `<img src="${chroma.swatch}" alt="${chroma.displayName}" class="img-thumbnail mx-1 chroma-swatch chroma-item" data-index="${index}">`;
  });

  modalContent += `</div><div class="d-flex flex-column align-items-center" id="levelsContainer">`;

  // Populate levels
  skin.levels.forEach((level, index) => {
    if (level.streamedVideo) {
      modalContent += `<button class="btn btn-primary my-1 level-button" data-index="${index}">Level ${index + 1}</button>`;
    }
  });

  modalContent += `</div>`;
  $('#variantsModal .modal-body').html(modalContent);

  attachSwatchClickListeners(skin.chromas);
  attachLevelButtonClickListeners(skin.levels);
}

function attachSwatchClickListeners(chromas) {
  $('.chroma-swatch').click(function() {
    // Fetching the index than the data itself as it gives more security (ex: preventing XSS)
    const index = $(this).data('index');
    const fullRenderUrl = chromas[index].fullRender;

    $('#mainSkinImage').attr('src', fullRenderUrl);
  });
}

function attachLevelButtonClickListeners(levels) {
  $('.level-button').click(function() {
    const index = $(this).data('index');
    const level = levels[index];

    playLevelVideo(level.streamedVideo, level.displayName);
  });
}

function updateViewBoxWithFullRender(fullRenderUrl) {
  $('.view-box').html(
    `<img src="${fullRenderUrl}" class="img-fluid" alt="Skin Variant">`
  );
}

function playLevelVideo(videoUrl, displayName) {
  $('.view-box').html(`
    <video controls autoplay class="img-fluid">
      <source src="${videoUrl}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="mt-2">${displayName}</div>
  `);
}

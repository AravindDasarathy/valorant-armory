const PAGE_SIZE = 12;

const paginateSkins = (skins, page = 1) => {
  const currentPage = parseInt(page);
  const offset = (currentPage - 1) * PAGE_SIZE;
  const paginatedSkins = skins.slice(offset, offset + PAGE_SIZE);
  const totalPages = Math.ceil(skins.length / PAGE_SIZE);

  return { currentPage, totalPages, paginatedSkins };
};

export { paginateSkins };
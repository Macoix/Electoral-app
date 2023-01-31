const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)
  return { totalItems, rows, totalPages, currentPage }
}
export default getPagingData

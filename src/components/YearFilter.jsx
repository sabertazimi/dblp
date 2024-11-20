function YearFilter({ year, onYearChange }) {
  return (
    <>
      <Divider orientation="left">Year</Divider>
      <InputNumber
        min={0}
        max={new Date().getFullYear()}
        defaultValue={year}
        onChange={onYearChange}
      />
    </>
  )
}

export default YearFilter

import { getVenueTitle, VENUES_LIST } from '../api'

function Filter({
  venues,
  indeterminate,
  checkAll,
  onVenuesChange,
  onCheckAllChange,
}) {
  return (
    <>
      <Divider orientation="left">Venues</Divider>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
        style={
          checkAll ? { color: '#1890ff' } : { color: 'rgba(0, 0, 0, 0.65)' }
        }
      >
        <b>Check All</b>
      </Checkbox>
      <Checkbox.Group
        style={{
          width: '100%',
        }}
        value={venues}
        onChange={onVenuesChange}
      >
        <Row type="flex" justify="center" align="middle">
          {VENUES_LIST.map(venue => (
            <Col span={24} key={venue}>
              <Checkbox value={venue}>{getVenueTitle(venue)}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </>
  )
}

export default Filter

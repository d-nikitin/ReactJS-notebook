import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { Fragment, useEffect } from 'react';
import './cell-list.css';
import { useActions } from '../hooks/useActions';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id];
    });
  });
  const { fetchCells } = useActions();

  useEffect(
    () => {
      fetchCells();
    },
    // eslint-disable-next-line
    []
  );

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;

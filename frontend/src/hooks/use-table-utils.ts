import { useState, useCallback } from 'react';

import debounce from 'just-debounce-it';

import { KeyValue, UseTableProps } from '../types/hooks';
import { applyFilter, getComparator } from '../utils/table';

//-------------------------------------

export const useTable = <T extends KeyValue>({data=[], defaultDebounce=200, filterFields=[], defaultRowsPerPage=5} : UseTableProps<T>) => {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const [selected, setSelected] = useState<Array<number | string>>([]);

  const [orderBy, setOrderBy] = useState('none');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const [dense, setDense] = useState(true);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  const handleFilterByName = (value: string) => {
    setPage(0);
    setFilterName(value);
  };

  const debounceOnFilter = debounce(
    (inputValue:string) => handleFilterByName(inputValue),
    defaultDebounce
  );

  const cleanFilterText = () => {
    setFilterName('');
  };

  const handleSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectRow = useCallback(
    (inputValue: string | number) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const dataFiltered: T[] = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
    filterFields
  });

  const handleSelectAllClick = useCallback((newSelecteds: Array<number | string>, notFound: boolean) => {
    if (notFound) return;
    setSelected(newSelecteds);
  }, []);

  return {
    page,
    rowsPerPage,
    order,
    orderBy,
    selected,
    filterName,
    dense,
    onResetPage,
    onChangePage,
    onChangeRowsPerPage,
    debounceOnFilter,
    handleSelectAllClick,
    onSelectRow,
    handleSort,
    dataFiltered,
    setDense,
    cleanFilterText,
  };
};

import { UseFiltersColumnProps } from 'react-table';
import { InputProps } from 'react-tec';

import { FilterInput } from './styledComponents';

type FilterBasicProps<T extends object = {}> = {
  column: UseFiltersColumnProps<T>;
} & InputProps;
export const FilterBasic = <T extends object = {}>(
  props: FilterBasicProps<T>,
) => {
  const { column, ...rest } = props;
  const { filterValue, setFilter } = props.column;

  return (
    <FilterInput
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      {...rest}
    />
  );
};

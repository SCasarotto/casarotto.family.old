import { UseFiltersColumnProps } from 'react-table';
import { InputProps } from 'react-tec';

import { FilterInput } from './styledComponents';

type FilterBasicProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  column: UseFiltersColumnProps<T>;
} & InputProps;
export const FilterBasic = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
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

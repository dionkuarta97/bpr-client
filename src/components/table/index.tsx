import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Text from '../text';
import { Row, Column } from '@/interface/global';
import { Pagination, Paper, TableFooter } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
type DataTableProps<T extends Record<string, any>> = {
  columns: Column<T>[];
  rows: Row<T>[];
  metadata?: {
    page: number;
    total: number;
    perPage: number;
    total_page: number;
  };
};

const DataTable = <T extends Record<string, any>>({
  columns,
  rows,
  metadata,
}: DataTableProps<T>) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell width={column.width} key={column.field}>
                <Text label={column.headerName} variant="h4" color="text.secondary" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: T, index: number) => (
            <TableRow key={index}>
              {columns.map(column => (
                <TableCell width={column.width} key={column.field}>
                  {column.render ? (
                    column.render(row)
                  ) : column.field === 'actions' && row.actions ? (
                    <div className="flex flex-row gap-2">
                      {row.actions.map(
                        (action: {
                          actionName: string;
                          action: () => void;
                          icon: React.ComponentType;
                        }) => (
                          <IconButton key={action.actionName} onClick={() => action.action()}>
                            <action.icon />
                          </IconButton>
                        )
                      )}
                    </div>
                  ) : (
                    row[column.field]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {/* Tambahkan baris data lainnya di sini */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>
              {!metadata ? (
                <Text label={`Total: ${rows.length}`} variant="h5" color="text.secondary" />
              ) : (
                <div className="flex flex-row items-center justify-between">
                  <Text label={`Total: ${metadata?.total}`} variant="h5" color="text.secondary" />
                  <Pagination
                    count={metadata?.total_page}
                    page={metadata?.page}
                    onChange={(event, value) => {
                      event.preventDefault();
                      const newParams = new URLSearchParams(params);
                      newParams.set('page', value.toString());
                      navigate(`?${newParams.toString()}`);
                    }}
                  />
                </div>
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;

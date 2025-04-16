import { ArrowLeft, ArrowRight} from 'lucide-react';
import Loading from './Loading';
import type { TableProps } from '@/types/Table';
import Button from './Button';

export default function Table({
  columns,
  data,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  isLoading,
  renderRow
}: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      ) : (
        <div className="min-w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} className="p-4 text-left font-semibold text-gray-800 border-b">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                renderRow ? data.map(item => renderRow(item)) : ""
              ) : (
                <tr>
                  <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                    Nenhum dado disponível
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center items-center my-8">
        
        <Button 
        onClick={onPrevPage} 
        variant={currentPage === 1 ? 'disabled' : undefined} >
          <ArrowLeft className="size-8"/>
        </Button>
        <span className="px-6 py-3 bg-gray-100 text-gray-700 border-t border-b border-gray-300">
          Página {currentPage} de {totalPages}
        </span>
        <Button 
        onClick={onNextPage} 
        variant={currentPage === totalPages ? 'disabled' : undefined} >
          <ArrowRight className="size-8"/>
        </Button>

      </div>
    </div>
  );
}
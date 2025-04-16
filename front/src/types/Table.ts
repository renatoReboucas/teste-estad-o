import { News } from '@/types/News';

export interface TableProps {
  columns: string[];
  data?: News[];
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  isLoading?: boolean;
  renderRow?: (item: News) => React.ReactNode;
}
import { DAYS } from './date';

export const formatCellContent = (
  content: any,
  type?: string,
  rowNumber: number = 0
) => {
  switch (type) {
    case 'number':
      return content.toLocaleString('de-DE');
    case 'currency':
      return content.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
      });
    case 'percentage':
      return `${content.toLocaleString('de-DE')} %`;
    case 'rowNumber':
      return rowNumber + 1;
    case 'datetime':
      return new Date(content).toLocaleString('de-DE', {
        dateStyle: 'medium',
        timeStyle: 'medium',
      });
    case 'date':
      return new Date(content).toLocaleDateString('de-DE', {
        dateStyle: 'medium',
      });
    case 'boolean':
      return content ? 'Ja' : 'Nein';
    case 'daynumbers':
      return content.map((dayNumber: number) => DAYS[dayNumber]).join(', ');
    case 'list':
      return content;
    default:
      return content;
  }
};

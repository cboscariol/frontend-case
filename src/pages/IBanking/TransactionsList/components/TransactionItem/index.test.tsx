import { render } from '@testing-library/react';
import TransactionItem from './index';
import { ITransactionItem } from '../../../types';
import { getDateAndTime } from '../../../../../utils/getDateAndTime/getDateAndTime';
import { formatAmount } from '../../../../../utils/formatAmount/formatAmount';

import "@testing-library/jest-dom";

jest.mock("./index.css", () => ({}));
jest.mock("../../../../../assets/entry-transaction.svg", () => (<p>ENTRY_ARROW</p>));
jest.mock("../../../../../assets/exit-transaction.svg", () => (<p>EXIT_ARROW</p>));
jest.mock("../../../../../assets/reverse-transaction.svg", () => (<p>REVERSE_ARROW</p>));

jest.mock('../../../../../utils/getDateAndTime/getDateAndTime');
jest.mock('../../../../../utils/formatAmount/formatAmount');

describe('TransactionItem', () => {
    const mockTransactionItem: ITransactionItem = {
        transactionType: 'ENTRY',
        name: 'Test Transaction',
        label: 'Test Label',
        dateEvent: new Date('2023-10-10T10:00:00Z'),
        amount: 1000,
        id: '12345',
        description: 'description',
        entry: 'DEBIT',
        status: 'COMPLETED'
    };

    beforeEach(() => {
        (getDateAndTime as jest.Mock).mockReturnValue('10/10/2023 10:00 AM');
        (formatAmount as jest.Mock).mockReturnValue('$1,000.00');
    });

    it('should render transaction item with correct data', () => {
        const { getByText, getByAltText } = render(<TransactionItem item={mockTransactionItem} />);

        expect(getByAltText('ENTRY')).toBeInTheDocument();
        expect(getByText('Test Transaction')).toBeInTheDocument();
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByText('10/10/2023 10:00 AM')).toBeInTheDocument();
        expect(getByText('+ $1,000.00')).toBeInTheDocument();
    });

    it('should render correct styles for ENTRY transaction type', () => {
        const { container } = render(<TransactionItem item={mockTransactionItem} />);
        const transactionName = container.querySelector('.transaction__entry');
        const transactionAmount = container.querySelector('.transaction__entry');

        expect(transactionName).toBeInTheDocument();
        expect(transactionAmount).toBeInTheDocument();
    });

    it('should render correct styles for EXIT transaction type', () => {
        const exitTransactionItem: ITransactionItem = { ...mockTransactionItem, transactionType: 'EXIT' };
        const { container } = render(<TransactionItem item={exitTransactionItem} />);
        const transactionName = container.querySelector('.transaction__exit');
        const transactionAmount = container.querySelector('.transaction__exit');

        expect(transactionName).toBeInTheDocument();
        expect(transactionAmount).toBeInTheDocument();
    });

    it('should render correct styles for REVERSE transaction type', () => {
        const reverseTransactionItem: ITransactionItem = { ...mockTransactionItem, transactionType: 'REVERSE' };
        const { container } = render(<TransactionItem item={reverseTransactionItem} />);
        const transactionName = container.querySelector('.transaction__reserse');
        const transactionAmount = container.querySelector('.transaction__reserse');

        expect(transactionName).toBeInTheDocument();
        expect(transactionAmount).toBeInTheDocument();
    });
});
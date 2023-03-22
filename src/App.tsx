import * as C from './App.styles'
import { useEffect, useState } from 'react'
// types
import {Item} from './types/Item'
import {Category} from './types/Category'
// dados
import {categories} from './data/categories'
import {items} from './data/items'
// helper
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter'
import TableArea from './components/TableArea'
import InfoArea from './components/InfoArea'
import { InputArea } from './components/InputArea'

const App = () => {

  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth ] = useState(getCurrentMonth());
  const [income, setIncome ] = useState(0);
  const [expense, setExpense ] = useState(0);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for(let i in filteredList){
      if(categories[filteredList[i].category].expense){
        expenseCount += filteredList[i].value;
      }else{
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);

  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  }

  const handleAddItem = (item: Item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
  }

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        {/* Area 1 : informações*/}
        <InfoArea 
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />
        {/* Area 2 : inserção */}
        <InputArea
          onAdd={handleAddItem}
        />

        {/* Area 3 : tabela */}
        <TableArea list={filteredList}/>

        </C.Body>
    </C.Container>

  )
}

export default App
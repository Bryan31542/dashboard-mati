import React from 'react'
import { GridComponent, Toolbar, ColumnsDirective, ColumnDirective, Page, Search, Inject} from "@syncfusion/ej2-react-grids";

import { employeesGrid, employeesData } from "../data/dummy";
import { Header } from '../components';

const Assistants = () => {
  return (
      <div>
        <div className='m-2 mt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-10'>
          <Header category='Page' title='Assistants' />
          <GridComponent
              dataSource={employeesData}
              allowPaging
              allowSorting
              width='auto'
              toolbar={['Search']}
          >
            <ColumnsDirective>
              {
                employeesGrid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />
                ))
              }
            </ColumnsDirective>
            {/* Opciones adicionales*/}
            <Inject services={[Page, Search, Toolbar]} />

          </GridComponent>

        </div>
      </div>


  )
}

export default Assistants
import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject} from "@syncfusion/ej2-react-grids";

import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from '../components';

const Transactions = () => {
  return (
      <div>
        <div className='m-2 mt-20 md:m-10 p-2 md:p-10 bg-white rounded-3xl pt-10'>
          <Header category='Page' title='Transactions' />
            <GridComponent
                id='gridcomp'
                dataSource={ordersData}
                allowPaging
                allowSorting
            >
                <ColumnsDirective>
                    {
                        ordersGrid.map((item, index) => (
                            <ColumnDirective key={index} {...item} />
                        ))
                    }
                </ColumnsDirective>

                {/* Opciones adicionales*/}
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />

            </GridComponent>

        </div>
      </div>
  )
}

export default Transactions
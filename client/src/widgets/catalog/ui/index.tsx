import { useGate, useStore } from "effector-react"
import { $loadPending, $productList, productsGate, } from "entities/product/model/store"
import { Card } from "shared/ui/card"
import './catalog.css'
import { Filter } from "widgets/filter"
import { Col, Row } from "antd"
import { useEffect } from "react"
import { $auth } from "entities/auth/store/auth.store"
import { WorkProductModal } from "widgets/new-product-modal/ui/WorkProductModal"
import { Spinner } from "shared/ui/spinner"
import { ChangeProductInCatalogButton, DeleteProductFromCatalog } from "features/work-with-product"

export const Catalog = () => {
    
    const productList = useStore($productList)
    const auth = useStore($auth)
    const pending = useStore($loadPending)

    return (
        <>
            <Row
                style={{
                    marginTop: '5%'
                }}
            >
                <Col
                    span={6}
                >
                    <Filter/>
                </Col>
                <Col
                    span={18}
                >
                    {(pending && <Spinner/>) || 
                        <>
                            <WorkProductModal work="add"/>
                            <ul className="catalog">
                                {productList.map((product) => {
                                    return (
                                        <Card key={product.id_product} product={product}>
                                            <DeleteProductFromCatalog id_product={product.id_product} title_product={product.title_product}/>
                                            <WorkProductModal product={product} work="change"/>
                                        </Card>
                                    )
                                })}
                            </ul>
                        </>
                    }
                    
                </Col>
            </Row>
        </>
    )
}
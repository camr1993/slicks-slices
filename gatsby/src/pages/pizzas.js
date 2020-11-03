import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import ToppingFilter from '../components/ToppingFilter'
import SEO from '../components/SEO'

export default function PizzasPage({ pageContext, data: { pizzas } }) {
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas With ${pageContext.topping}`
            : `All Pizzas`
        }
      />
      <ToppingFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas.nodes} />
    </>
  )
}

export const query = graphql`
  query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`

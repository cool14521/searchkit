import * as React from 'react'

import {
  ReactComponentType,
  PureRender,
  FastClick,
} from "../../../"

const bemBlock = require('bem-cn')
const size = require('lodash/size')
const toArray = require('lodash/toArray')
const map = require('lodash/map')

export interface FilterGroupItemProps {
  key: string
  bemBlocks?: any
  label: string
  filter: any
  removeFilter: Function
}

@PureRender
export class FilterGroupItem extends React.Component<FilterGroupItemProps, any> {

  constructor(props){
    super(props)
    this.removeFilter = this.removeFilter.bind(this)
  }

  removeFilter(){
    const { removeFilter, filter } = this.props
    if (removeFilter){
      removeFilter(filter)
    }
  }

  render() {
    const { bemBlocks, label } = this.props

    return (
      <FastClick handler={this.removeFilter}>
        <div className={bemBlocks.item("value") }>{label}</div>
      </FastClick>
    )
  }
}

export interface FilterGroupProps {
  mod?: string
  className?: string
  title: string
  filters: Array<any>
  translate?: Function
  removeFilter: Function
  removeFilters: Function
}

export class FilterGroup extends React.Component<FilterGroupProps, any> {

  constructor(props){
    super(props)
    this.removeFilters = this.removeFilters.bind(this)
  }

  static defaultProps = {
    mod: "sk-filter-group",
    translate: (str) => str
  }

  removeFilters(){
    const { removeFilters, filters } = this.props
    if (removeFilters){
      removeFilters(filters)
    }
  }

  render() {
    const { mod, className, title, filters, removeFilters, removeFilter } = this.props

    const bemBlocks = {
        container: bemBlock(mod),
        item: bemBlock (`${mod}-item`)
    }
      
    return (
      <div key={title} className={bemBlocks.item().mix(className)}>
        {this.renderRemove(bemBlocks)}
        <div className={bemBlocks.item("title") }>{title}</div>
        {map(filters, filter => this.renderFilter(filter, bemBlocks))}
      </div>
    )
  }

  renderFilter(filter, bemBlocks) {
    const { translate, removeFilter } = this.props

    return (
      <FilterGroupItem key={filter.value}
                  bemBlocks={bemBlocks}
                  filter={filter}
                  label={translate(filter.value)}
                  removeFilter={removeFilter} />
    )
  }
  
  renderRemove(bemBlocks){
    if (!this.props.removeFilters) return null
    
    return (
      <FastClick handler={this.removeFilters}>
        <div className={bemBlocks.item("remove-action") } onClick={this.removeFilters}>X</div>
      </FastClick>
    )
  }
}

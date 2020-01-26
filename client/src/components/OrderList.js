import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getOrders , deleteOrder } from '../actions/orderActions';
import PropTypes from 'prop-types';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export class OrderList extends Component {

    componentDidMount() {
        this.props.getOrders();
    }

    onDeleteClick = (id) => {
        this.props.deleteOrder(id);
      }

    render() {
        const { orders } = this.props.order;
        return (
            <div>
                <Table dark>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th style={{textAlign : 'center'}}>Name</th>
                            <th style={{textAlign : 'center'}}>Description</th>
                            <th style={{textAlign : 'center'}}>Quantity</th>
                            <th style={{textAlign : 'center'}}>Status</th>
                            <th style={{textAlign : 'center'}}>Rating</th>
                            <th style={{textAlign : 'center'}}>Place of delivery</th>
                            <th style={{textAlign : 'center'}}>Date</th>
                            <th style={{textAlign : 'center'}}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(({ _id, name , description , quantity, status, rating ,place_of_delivery , date },i) => (
                        <tr>
                            <th scope="row">{i+1}</th>
                            <td style={{textAlign : 'center'}}>{name}</td>
                            <td style={{textAlign : 'center'}}>{description}</td>
                            <td style={{textAlign : 'center'}}>{quantity}</td>
                            <td style={{textAlign : 'center'}}>{status}</td>
                            <td style={{textAlign : 'center'}}>{rating}</td>
                            <td style={{textAlign : 'center'}}>{place_of_delivery}</td>
                            <td style={{textAlign : 'center'}}>{date.substring(0,10)}</td>
                            <td>
                                <Link to={`/edit/${_id}`}>
                                    <FaEdit color='white' />
                                </Link>{' '}
                                |{' '}
                                <a
                                    href='/orders'
                                    onClick={this.onDeleteClick.bind(this,_id)}
                                >
                                    <FaTrash color='white' />
                                </a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

OrderList.propTypes = {
    getOrders : PropTypes.func.isRequired
  }

const mapStateToProps = (state) => ({
    order : state.order
})

export default connect(mapStateToProps, {
    getOrders , deleteOrder 
  })(OrderList);

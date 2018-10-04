import React from 'react';
import Head from 'next/head';
import { Grid, Message, Form, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import contract from '../../ethereum/messageContract';

class Index extends React.Component {

    static async getInitialProps() {
        const currentMessage = await contract.methods.message().call();
        return {currentMessage }
    }

    state = {
        currentMessage: this.props.currentMessage,
        amount: '1001',
        newMessage: ''
    }

    constructor(props) {
        super(props);
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        this.setState({currentMessage: 'Changing...  Please Wait'});
        await contract.methods.setMessage(this.state.newMessage).send({
            from: accounts[0],
            value: this.state.amount
        });
        const currentMessage = await contract.methods.message().call();
        this.setState({currentMessage});
    }

    render() {
        return(
            <React.Fragment>
                <Head>
                    <title>Hello, Ethereum</title>
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
                </Head>
                <Grid padded>
                    <Grid.Row centered columns={3}>
                        <Grid.Column>
                            <h1>Ethereum Message in a Bottle</h1>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3} centered>
                        <Grid.Column>
                            <Message positive>
                                <Message.Header>Current Message</Message.Header>
                                <Message.Content>
                                    {this.state.currentMessage}
                                </Message.Content>
                            </Message>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3} centered>
                        <Grid.Column>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Field>
                                    <label>Amount</label>
                                    <input type="number" value={this.state.amount} onChange={(event) => this.setState({amount: event.target.value})} />
                                </Form.Field>
                                <Form.Field>
                                    <label>New Message</label>
                                    <input type="text" value={this.state.newMessage} onChange={event => this.setState({ newMessage: event.target.value })} />
                                </Form.Field>
                                <Form.Button positive>
                                    Save
                                </Form.Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }

}

export default Index;

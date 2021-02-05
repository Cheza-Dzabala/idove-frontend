import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#38a9ff',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);



const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default ({ posts, forum, topic }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="left">Comments</StyledTableCell>
                        <StyledTableCell align="left">Author</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((post) => (
                        <StyledTableRow key={post.id}>
                            <StyledTableCell component="th" scope="row">
                                <Link to={`${topic.slug}/${post.slug}`}>{post.title}</Link>
                            </StyledTableCell>
                            <StyledTableCell align="left">{post.comment_count}</StyledTableCell>
                            <StyledTableCell align="left">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Avatar alt={post.author.full_name} src={post.author.avatar} />
                                    <Link to={`/profiles/${post.author.slug}`}>
                                        {post.author.full_name}
                                    </Link>
                                    <p>{post.published}</p>
                                </div>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>


        </TableContainer>
    );
}
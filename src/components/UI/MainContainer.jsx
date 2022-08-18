import classes from './MainContainer.module.css'


const MainContainer = (props) => {

    return (
        <div className={classes['main-container']}>
            {props.children}
        </div>
    )
}
export default MainContainer
import React, {Component} from "react";
import {connect} from "react-redux";

import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

import {thumbnails, auth} from "../actions";
import CustomAppBar from "../components/CustomAppBar";
import CircularIndeterminate from '../components/CircularProgress';


const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '30%', // Fix IE11 issue.
    margin: theme.spacing.unit + ' auto',
    
    display: 'flex',
    flexDirection: 'column',
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    height: 240,
  },
  cardContent: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  hide: {
    display: 'none',
  },
});


class Thumbnailer extends Component {
  state = {
    image: null,
    caption: "",
    updateThumbnailId: null,
    previewImageURL: null,
    isLoading: false
  };

  componentDidMount() {
    this.props.fetchThumbnails();
  }

  resetForm = () => {
    this.setState({
      image: null,
      caption: "",
      updateThumbnailId: null,
      previewImageURL: null,
      isLoading: false,
    });
  }

  selectForEdit = (id) => {
    let thumbnail = this.props.thumbnails[id];
    this.setState({
      image: thumbnail.image,
      caption: thumbnail.caption,
      updateThumbnailId: id,
      previewImageURL: thumbnail.image,
    });
  }

  submitThumbnail = (e) => {
    e.preventDefault();

    this.setState({isLoading: true});
    if (this.state.updateThumbnailId === null) {
      this.props.addThumbnail(this.state.image, this.state.caption).then(this.resetForm)
    } else {
      this.props.updateThumbnail(this.state.updateThumbnailId, new URL(this.state.image), this.state.caption).then(this.resetForm);
    }
  }

  loadPreviewImage = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onload = () => {
      this.setState({
        image: image,
        previewImageURL: reader.result
      });
    }
    
    reader.readAsDataURL(image);
  }

  render() {
    return (
      <React.Fragment>
        <CustomAppBar />
        <main>
          <div className={this.props.classes.heroUnit}>
            <div className={this.props.classes.heroContent}>
              <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
                ThumbsUp!
              </Typography>
              <Typography variant="title" align="center" color="textSecondary" paragraph>
                Upload your images and we Thumb'them Up!
              </Typography>
            </div>
          </div>

          <Paper className={this.props.classes.paper}>
            <form className={this.props.classes.form} onSubmit={this.submitThumbnail}>
              <FormControl margin="normal" required>
                <input
                  id="outlined-button-file"
                  name="image"
                  accept="image/*"
                  className={this.props.classes.input}
                  type="file"
                  onChange={e => this.loadPreviewImage(e)}
                />
                <label htmlFor="outlined-button-file">
                  <Button
                    fullWidth
                    component="span"
                    variant="contained"
                    className={this.props.classes.button}
                  >
                    Select an image
                  </Button>
                </label>

                <Card className={this.state.previewImageURL === null ? this.props.classes.hide : this.props.classes.card}>
                  <CardMedia
                    className={this.props.classes.cardMedia}
                    image={this.state.previewImageURL}
                    title="Image about to be Thumb it!"
                  />
                </Card>
              </FormControl>
              <FormControl margin="normal">
                <InputLabel htmlFor="caption">Add caption (optional)</InputLabel>
                <Input 
                  id="caption"
                  name="caption"
                  type="text"
                  value={this.state.caption}
                  onChange={e => this.setState({caption: e.target.value})}
                />
              </FormControl>
              {/* TODO: Add warning message when form submission fails */}
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={this.props.classes.submit}
              >
                Thumb it now!
              </Button>
              <CircularIndeterminate isLoading={this.state.isLoading} />
            </form>
          </Paper>

          <div className={classNames(this.props.classes.layout, this.props.classes.cardGrid)}>
            <Grid container spacing={40}>
              {this.props.thumbnails.map((thumbnail, id) => (
                <Grid item key={id} sm={6} md={4} lg={3}>
                  <Card className={this.props.classes.card}>
                    <CardMedia
                      className={this.props.classes.cardMedia}
                      image={thumbnail.image}
                      title={thumbnail.caption === "" ? `Thumb ${thumbnail.id}` : thumbnail.caption}
                    />
                    <CardContent className={this.props.classes.cardContent}>
                      <Typography>{thumbnail.caption}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => this.props.deleteThumbnail(id)}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    thumbnails: state.thumbnails,
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchThumbnails: () => {
      dispatch(thumbnails.fetchThumbnails());
    },
    addThumbnail: (image, caption) => {
      return dispatch(thumbnails.addThumbnail(image, caption));
    },
    updateThumbnail: (id, image, caption) => {
      return dispatch(thumbnails.updateThumbnail(id, image, caption));
    },
    deleteThumbnail: (id) => {
      dispatch(thumbnails.deleteThumbnail(id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Thumbnailer));

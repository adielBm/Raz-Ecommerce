import { fromImageToUrl } from '../utils/fromImageToUrl'
import Link from 'next/link'
import Image from 'next/image'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { ButtonBase } from '@mui/material';

const ProductList = (products) => {

  return (
    <Grid container spacing={4}>
      {products.products.map((product) => (
        <Grid key={product.id} item md={4}>
          <Card style={{ height: '200px' }} sx={{ display: 'flex' }} >
            <Link href={`/product/${product.slug}`}>
              <ButtonBase >
                <CardContent style={{ textAlign: 'left' }}>
                  <Typography component="div" variant="h5">
                    {product.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {product.content.substring(0, 50)}...
                  </Typography>
                </CardContent>
                <CardMedia title="Your title">
                  <div style={{ width: '200px', height: '200px', position: 'relative' }}>
                    <Image
                      alt='Mountains'
                      src={fromImageToUrl(product.image)}
                      width={2}
                      height={2}
                      layout="responsive"
                    />
                  </div>
                </CardMedia>
              </ButtonBase>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductList
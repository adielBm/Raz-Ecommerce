import { fromImageToUrl } from '../utils/fromImageToUrl'
import Link from 'next/link'
import Image from 'next/image'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const ProductList = (products) => {
  return (
    <Grid container spacing={4}>
      {products.products.map((product) => (
        <Grid key={product.id} item xs={6} md={3}>
          <Link href={`/product/${product.slug}`}>
            <a>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Image width={200} height={200} src={fromImageToUrl(product.image)} />
                  <h2>{product.title}</h2>
                  <Typography>{product.content.substring(0, 200)}...</Typography>
                  <Button variant="contained">Buy</Button>
                </CardContent>
              </Card>
            </a>
          </Link>
        </Grid>
      ))
      }
    </Grid>
  )
}

export default ProductList